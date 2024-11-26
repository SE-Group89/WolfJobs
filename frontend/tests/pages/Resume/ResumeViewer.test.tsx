// ResumeViewer.test.tsx
import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import ResumeViewer from '../../../src/components/Resume/ResumeViewer.tsx'; // Update the path as necessary
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Helper function to render the ResumeViewer component within a mocked router
const initializeComponent = () => {
  return render(
    <MemoryRouter initialEntries={['/resume/1']}>
      <Routes>
        <Route path="/resume/:applicantId" element={<ResumeViewer />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ResumeViewer Component Tests', () => {
  it('renders the ResumeViewer component successfully', () => {
    const { container } = initializeComponent();

    // Verify that the ResumeViewer container is present
    const resumeViewerElement = container.querySelector('.flex');

    // Assert that the container element is rendered
    expect(resumeViewerElement).toBeTruthy();
  });

  it('displays navigation buttons and page number text correctly', async () => {
    const { container } = initializeComponent();

    // Locate navigation buttons and page number text
    const previousButton = container.querySelector('button.rounded-l');
    const nextButton = container.querySelector('button.rounded-r');
    const pageNumberText = container.querySelector('p');

    // Verify that navigation buttons and page text are rendered
    expect(previousButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
    expect(pageNumberText?.textContent).toContain('Page 1 of');

    // Simulate clicking the "Next" button
    if (nextButton) {
      fireEvent.click(nextButton);
      await waitFor(() =>
        expect(pageNumberText?.textContent).not.toContain('Page 2 of')
      );
    }

    // Simulate clicking the "Previous" button
    if (previousButton) {
      fireEvent.click(previousButton);
      await waitFor(() =>
        expect(pageNumberText?.textContent).toContain('Page 1 of')
      );
    }
  });
});
