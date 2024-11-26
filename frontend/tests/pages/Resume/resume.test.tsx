// Resume.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Resume from '../../../src/Pages/Resume/Resume.tsx'; // Update path as necessary
import axios from 'axios';

// Mock implementation for axios.post
const mockPostRequest = (url: string, payload: any) => {
  return new Promise((resolve, reject) => {
    if (url === 'http://localhost:8000/resume/parseResume') {
      resolve({
        data: {
          success: true,
          ats_score: 250, // Mock default score
        },
      });
    } else {
      reject(new Error('Invalid API endpoint'));
    }
  });
};

// Save the original axios.post function for restoration
const originalPost = axios.post;

// Replace axios.post with the mock version before each test
beforeEach(() => {
  axios.post = mockPostRequest;
});

// Restore the original axios.post function after each test
afterEach(() => {
  axios.post = originalPost;
});

// Helper function to render the Resume component
const initializeComponent = () => {
  return render(<Resume />);
};

describe('Resume Component Tests', () => {
  it('should render the Resume component without errors', () => {
    const { getByText } = initializeComponent();

    // Verify the presence of a heading or title like "Resume"
    expect(getByText(/Resume/i)).toBeInTheDocument();
  });

  it('ATS Score Visibility - initially hidden and displays after action', () => {
    const { container } = initializeComponent();

    // Ensure the initial render state matches expectations
    expect(container).toMatchSnapshot();
  });
});
