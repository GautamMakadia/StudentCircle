import { useEffect, useState } from "react";
import ContentList from "components/PendingContentList";

interface Content {
  id: number;
  title: string;
  student_id: number;
  teacher_id: number;
  hashtag: string[];
  size: number;
  content_type: string;
  file_type: string;
  file_path: string;
  feedback: number;
  feedback_count: number;
}

const Home = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("http://10.150.148.207:5500/content/pending")
      .then((res) => res.json())
      .then((data) => {
        setContent(data.content); // Adjust for the new structure
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching content:", err));
  }, []);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (content.length == 0) {
    return <h1 className="text-2xl font-bold text-center mb-4">No Pending Records</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Educational Resources</h1>
      <ContentList content={content} />
    </div>
  );
};




export default Home;