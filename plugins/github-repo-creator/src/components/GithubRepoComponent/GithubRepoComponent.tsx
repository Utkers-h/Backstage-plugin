
import React, { useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { GithubRepoApiRef } from '../../api';
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core';

export const GithubRepoComponent = () => {
  const [repoName, setRepoName] = useState('');
  const [repoDescription, setRepoDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false); // State for private repository checkbox
  const [error, setError] = useState<string | null>(null);
  const githubRepoApi = useApi(GithubRepoApiRef);

  const handleSubmit = async () => {
    try {
      setError(null);
      await githubRepoApi.createRepo(repoName, repoDescription, isPrivate); 
      alert('Repository created successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Box maxWidth={400} mx="auto" p={3} boxShadow={3} borderRadius={8}>
        <Typography variant="h5" align="center" gutterBottom>
          Create GitHub Repository
        </Typography>
        <TextField
          label="Repository Name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Repository Description"
          value={repoDescription}
          onChange={(e) => setRepoDescription(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              color="primary"
            />
          }
          label="Private Repository"
          style={{ marginTop: 16 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          size="large"
          style={{ marginTop: 16 }}
        >
          Create Repository
        </Button>
        {error && (
          <Typography color="error" align="center" style={{ marginTop: 16 }}>
            {error}
          </Typography>
        )}
      </Box>
    </div>
  );
};


