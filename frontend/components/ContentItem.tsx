interface Content {
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

const ContentItem = ({ data }: { data: Content }) => {
  // Function to get file format label
  const getFileLabel = (type: string) => {
    switch (type) {
      case "application/pdf":
        return "PDF Document";
      case "application/docx":
      case "application/msword":
        return "Word Document";
      case "application/ppt":
      case "application/vnd.ms-powerpoint":
        return "PowerPoint Presentation";
      case "application/zip":
        return "ZIP Archive";
      case "audio/mpeg":
      case "audio/mp3":
        return "Audio File (MP3)";
      case "video/mp4":
      case "video/mpeg":
        return "Video File (MP4)";
      default:
        return "Unknown File";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 border">
      {/* Subject & File Type */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{data.title}</h3>
        <p className="text-xs text-gray-500">Subject: {data.content_type}</p>
        <p className="text-sm text-gray-700 font-medium mt-1">{getFileLabel(data.file_type)}</p>
      </div>

      {/* File Info */}
      <p className="text-sm text-gray-500">Size: {data.size} KB</p>
      <p className="text-xs text-gray-400">Uploaded by Student {data.student_id}, Teacher {data.teacher_id}</p>

      {/* Download Link */}
      <div className="mt-2">
        <a href={data.file_path} download className="text-blue-500 font-semibold hover:underline">
          Download File
        </a>
      </div>

      {/* Hashtags */}
      {data.hashtag.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.hashtag.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Feedback */}
      <div className="mt-3">
        <p className="text-sm text-gray-700 font-medium">
          ⭐ {data.feedback} ({data.feedback_count} reviews)
        </p>
      </div>
    </div>
  );
};

export default ContentItem;
