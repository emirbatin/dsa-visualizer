import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Input, Spacer } from '@nextui-org/react';
import CodeBlock from "../components/CodeBlock";

const mdParser = new MarkdownIt();
const components = {
  code: CodeBlock,
};

const AddAlgorithmPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [visualizer, setVisualizer] = useState('');
  const navigate = useNavigate();

  const handleEditorChange = ({ text }) => {
    setDescription(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/algorithms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, image, visualizer }),
    });
    navigate('/admin/dashboard'); // Dashboard'a geri dön
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Yeni Algoritma Ekle</h1>
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
        <Button type="submit" auto>Save</Button>
      </form>
    </div>
  );
};

export default AddAlgorithmPage;
