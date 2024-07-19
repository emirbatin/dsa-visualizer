import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Input, Spacer } from '@nextui-org/react';

const mdParser = new MarkdownIt();

const EditAlgorithmPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [visualizer, setVisualizer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlgorithm = async () => {
      const response = await fetch(`/api/algorithms/${id}`);
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
      setImage(data.image);
      setVisualizer(data.visualizer);
    };
    fetchAlgorithm();
  }, [id]);

  const handleEditorChange = ({ text }) => {
    setDescription(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/algorithms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, image, visualizer }),
    });
    navigate('/admin/dashboard');
  };

  const handleDelete = async () => {
    await fetch(`/api/algorithms/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    navigate('/admin/dashboard');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Algoritmayı Düzenle</h1>
      <Spacer y={4} />
      <form onSubmit={handleSubmit}>
        <Input
          label="Algorithm Name"
          placeholder="Algorithm Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <Spacer y={4} />
        <p>Description</p>
        <MdEditor
          value={description}
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
        <Spacer y={4} />
        <Input
          label="Image URL"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          required
        />
        <Spacer y={4} />
        <Input
          label="Visualizer"
          placeholder="Visualizer"
          value={visualizer}
          onChange={(e) => setVisualizer(e.target.value)}
          fullWidth
          required
        />
        <Spacer y={4} />
        <div className='flex flex-row'>
      
        <Button type="submit" color="primary"  auto>Save</Button>
        <Spacer x={4} />
        <Button type="button" auto color="danger" onClick={handleDelete}>Delete</Button>

        </div>
      </form>
    </div>
  );
};

export default EditAlgorithmPage;
