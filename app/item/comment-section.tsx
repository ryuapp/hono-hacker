import { type Item } from "../../features/hacker-news.ts";
import { timeAgo } from "../../features/hacker-news.ts";

type CommentsProps = {
  comments: Item[];
};

export function CommentSection({ comments }: CommentsProps) {
  return (
    <div class="comments">
      <Comments comments={comments} />
    </div>
  );
}

function Comments({ comments }: CommentsProps) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          comment={comment}
        />
      ))}
    </div>
  );
}

type CommentProps = {
  comment: Item;
};

function Comment(this: FC<{ show: boolean }>, props: CommentProps) {
  const { comment } = props;
  this.show = true;

  return (
    <>
      <div class="text-xs text-gray-500 pt-2 pb-1">
        <span class="cursor-pointer mr-1 text-sm text-gray-400">▲</span>
        <a class="user hover:underline" href={`/user?id=${comment.user}`}>
          {comment.user}
        </a>
        {timeAgo(comment.time)} ago
        <button
          type="button"
          class="hover:cursor-pointer"
          onClick={() => {
            this.show = !this.show;
          }}
        >
          {this.computed(() => this.show ? "[-]" : "[+]")}
        </button>
      </div>
      <toggle show={this.show}>
        <div class="text-[0.825rem] break-words">
          {html`
            ${comment.content ?? ""}
          `}
        </div>
        <div class="pl-5">
          {comment.comments && comment.comments.length > 0
            ? <Comments comments={comment.comments} />
            : null}
        </div>
      </toggle>
    </>
  );
}
