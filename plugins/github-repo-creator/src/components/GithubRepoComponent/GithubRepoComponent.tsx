import React, { useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { GithubRepoApiRef } from '../../api';
import { GithubRepo } from '../../types';
import { InfoCard,  Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Typography,Button, TextField } from '@material-ui/core';


export const GithubRepoComponent = () => {
  const githubRepoClient = useApi(GithubRepoApiRef);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [repo, setRepo] = useState<GithubRepo | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const newRepo = await githubRepoClient.createRepo({ name, description, private: isPrivate });
      setRepo(newRepo);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  };

  return (
    <Box>
      <InfoCard title="Create GitHub Repository">
        <TextField
          label="Repository Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
        />
        <Box display="flex" alignItems="center">
          <Typography>Private:</Typography>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={e => setIsPrivate(e.target.checked)}
          />
        </Box>
        <Button onClick={handleSubmit} disabled={loading}>
          Create
        </Button>
        {loading && <Progress />}
        {error && <ResponseErrorPanel error={error} />}
        {repo && (
          <Box>
            <Typography>Repository created successfully:</Typography>
            <Typography>Name: {repo.name}</Typography>
            <Typography>Description: {repo.description}</Typography>
          </Box>
        )}
      </InfoCard>
    </Box>
  );
};
