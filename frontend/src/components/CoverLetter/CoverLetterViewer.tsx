import { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";

// Import styles for react-pdf
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set up pdf worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function CoverLetterViewer() {
  // Get the applicant ID from URL parameters
  const { applicantId } = useParams();

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [coverLetterUrl, setCoverLetterUrl] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : 1
    );
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber < (numPages || 0) ? prevPageNumber + 1 : prevPageNumber
    );
  }

  useEffect(() => {
    async function getCoverLetter() {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/applicantcoverletter/${applicantId}`, // Adjust endpoint
          {
            responseType: "blob",
          }
        );
        const coverLetterBlobUrl = URL.createObjectURL(response.data);
        setCoverLetterUrl(coverLetterBlobUrl);
      } catch (error) {
        console.error("Error fetching cover letter", error);
      }
    }
    getCoverLetter();
  }, [applicantId]);

  // Cleanup the blob URL
  useEffect(() => {
    return () => {
      if (coverLetterUrl) {
        URL.revokeObjectURL(coverLetterUrl);
      }
    };
  }, [coverLetterUrl]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {coverLetterUrl && (
        <div className="border-2 border-black shadow-lg">
          <Document file={coverLetterUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-l hover:bg-blue-700"
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <p className="mx-2">
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={goToNextPage}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-r hover:bg-blue-700"
          disabled={pageNumber >= (numPages || 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoverLetterViewer;
