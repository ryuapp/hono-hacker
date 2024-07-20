import { useState } from "hono/jsx";
import { type Item } from "../../features/hackerNews.ts";
import { timeAgo } from "../../features/hackerNews.ts";

type CommentsProps = {
  comments: Item[];
};

export function CommentSection(props: CommentsProps) {
  const { comments } = props;
  return (
    <div class="comments">
      <Comments comments={comments} />
    </div>
  );
}

function Comments(props: CommentsProps) {
  const { comments } = props;
  return (
    <div>
      {comments.map((comment) => <Comment comment={comment} />)}
    </div>
  );
}

type CommentProps = {
  comment: Item;
};

function Comment(props: CommentProps) {
  const { comment } = props;
  const [open, setOpen] = useState(true);

  return (
    <>
      <div class="text-xs text-gray-500 pt-2 pb-1">
        <span class="cursor-pointer mr-1 text-sm text-gray-300">▲</span>
        <a class="user hover:underline" href={`/user?id=${comment.user}`}>
          {comment.user}
        </a>{" "}
        {timeAgo(comment.time)} ago{" "}
        <button onClick={() => setOpen(!open)}>{open ? "[-]" : `[+]`}</button>
      </div>
      <div
        class="text-[0.825rem] break-words"
        dangerouslySetInnerHTML={{
          __html: comment.content ?? "",
        }}
      />
      <div class="pl-5">
        {comment.comments && comment.comments.length > 0
          ? <Comments comments={comment.comments} />
          : null}
      </div>
    </>
  );
}
