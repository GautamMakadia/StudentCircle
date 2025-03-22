import ContentItem from "components/ContentItem";

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

const ContentList = ({ content }: { content: Content[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {content.map((item) => (
        <ContentItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ContentList;
