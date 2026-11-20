import { useMemo, useState } from 'react';
import { MessageSquare, ThumbsUp, CornerDownRight } from 'lucide-react';
import { CommentItem } from '../types/news';

interface CommentsSectionProps {
  articleId: string;
  initialComments: CommentItem[];
}

export function CommentsSection({ articleId, initialComments }: CommentsSectionProps) {
  const [commentsByArticle, setCommentsByArticle] = useState<Record<string, CommentItem[]>>({});
  const [sortBy, setSortBy] = useState<'insightful' | 'newest'>('insightful');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const comments = commentsByArticle[articleId] ?? initialComments;

  const updateComments = (updater: (prev: CommentItem[]) => CommentItem[]) => {
    setCommentsByArticle((map) => {
      const current = map[articleId] ?? initialComments;
      return { ...map, [articleId]: updater(current) };
    });
  };

  const sortedComments = useMemo(() => {
    const copy = [...comments];
    if (sortBy === 'insightful') {
      copy.sort((a, b) => b.upvotes - a.upvotes);
    } else {
      copy.sort((a, b) => b.createdAtMs - a.createdAtMs);
    }
    return copy;
  }, [comments, sortBy]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    const newItem: CommentItem = {
      id: `user-c-${Date.now()}`,
      author: authorName.trim() || 'Subscriber Reader',
      role: authorRole.trim() || 'Reader',
      location: 'Web Edition',
      timestamp: 'Just now',
      createdAtMs: Date.now(),
      body: commentBody.trim(),
      upvotes: 1,
      upvotedByMe: true,
    };

    updateComments((prev) => [newItem, ...prev]);
    setCommentBody('');
    setAuthorName('');
    setAuthorRole('');
  };

  const handleToggleUpvote = (commentId: string) => {
    updateComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        const already = Boolean(c.upvotedByMe);
        return {
          ...c,
          upvotes: already ? c.upvotes - 1 : c.upvotes + 1,
          upvotedByMe: !already,
        };
      })
    );
  };

  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    updateComments((prev) =>
      prev.map((c) => {
        if (c.id !== parentId) return c;
        const nextReplies = [
          ...(c.replies || []),
          {
            id: `reply-${Date.now()}`,
            author: 'Reader Response',
            role: 'Subscriber',
            timestamp: 'Just now',
            body: replyText.trim(),
          },
        ];
        return { ...c, replies: nextReplies };
      })
    );
    setReplyText('');
    setReplyTargetId(null);
  };

  return (
    <section
      id="reader-discussion"
      aria-label="Reader discussion"
      className="mt-12 border-t border-stone-300 pt-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wider text-[#9A3412]">
            Reader Perspectives
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-stone-900">
            Discussion ({comments.length})
          </h2>
        </div>

        <div
          role="group"
          aria-label="Sort discussion comments"
          className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-[#F3EFE6] p-1"
        >
          <button
            type="button"
            onClick={() => setSortBy('insightful')}
            className={`rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[34px] ${
              sortBy === 'insightful'
                ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Most Insightful
          </button>
          <button
            type="button"
            onClick={() => setSortBy('newest')}
            className={`rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[34px] ${
              sortBy === 'newest'
                ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Newest
          </button>
        </div>
      </div>

      {/* Composer */}
      <form
        onSubmit={handlePostComment}
        className="mt-6 rounded-lg border border-stone-200 bg-[#F3EFE6]/60 p-4 sm:p-5"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="comment-author" className="block text-xs font-medium text-stone-700">
              Your name
            </label>
            <input
              id="comment-author"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g., Hannah Lindqvist"
              className="mt-1 w-full rounded-md border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#1E3A8A] focus:outline-none min-h-[40px]"
            />
          </div>
          <div>
            <label htmlFor="comment-role" className="block text-xs font-medium text-stone-700">
              City or profession (optional)
            </label>
            <input
              id="comment-role"
              type="text"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder="e.g., Hydrologist, Hamburg"
              className="mt-1 w-full rounded-md border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#1E3A8A] focus:outline-none min-h-[40px]"
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="comment-body" className="block text-xs font-medium text-stone-700">
            Add a measured perspective
          </label>
          <textarea
            id="comment-body"
            rows={3}
            required
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Share a technical observation, local comparison, or question for the desk..."
            className="mt-1 w-full rounded-md border border-stone-300 bg-[#FBF9F5] px-3 py-2.5 text-sm leading-relaxed text-stone-900 placeholder:text-stone-400 focus:border-[#1E3A8A] focus:outline-none"
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Comments appear immediately in this local session.
          </span>
          <button
            type="submit"
            className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#172554] min-h-[40px] whitespace-nowrap shrink-0"
          >
            Post Response
          </button>
        </div>
      </form>

      {/* Comment Thread */}
      <div className="mt-8 divide-y divide-stone-200">
        {sortedComments.length === 0 ? (
          <div className="py-8 text-center text-sm text-stone-500">
            <MessageSquare className="mx-auto mb-2 h-5 w-5 text-stone-400" aria-hidden="true" />
            Be the first reader to respond to this dispatch.
          </div>
        ) : (
          sortedComments.map((comment) => (
            <article key={comment.id} className="py-6 first:pt-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex flex-wrap items-baseline gap-2 text-xs">
                  <span className="text-sm font-semibold text-stone-900">
                    {comment.author}
                  </span>
                  <span aria-hidden="true" className="text-stone-400">
                    ·
                  </span>
                  <span className="text-stone-600">{comment.role}</span>
                  <span aria-hidden="true" className="text-stone-400">
                    ·
                  </span>
                  <span className="text-stone-500">{comment.location}</span>
                </div>
                <span className="text-xs text-stone-500">{comment.timestamp}</span>
              </div>

              <p className="mt-2.5 text-sm leading-relaxed text-stone-800">
                {comment.body}
              </p>

              <div className="mt-3 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleToggleUpvote(comment.id)}
                  aria-pressed={Boolean(comment.upvotedByMe)}
                  className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors min-h-[34px] ${
                    comment.upvotedByMe
                      ? 'bg-[#1E3A8A]/10 text-[#1E3A8A]'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="font-mono tabular-nums">{comment.upvotes}</span>
                  <span>Recommend</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setReplyTargetId((curr) => (curr === comment.id ? null : comment.id))
                  }
                  className="text-xs font-medium text-stone-600 hover:text-stone-900 min-h-[34px] px-2"
                >
                  Reply
                </button>
              </div>

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-4 sm:ml-8 space-y-3 border-t border-stone-200 pt-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="rounded-md bg-[#F3EFE6]/60 p-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <CornerDownRight className="h-3 w-3 text-stone-400" aria-hidden="true" />
                          <span className="font-semibold text-stone-900">{reply.author}</span>
                          <span className="text-stone-400">·</span>
                          <span className="text-stone-600">{reply.role}</span>
                        </div>
                        <span className="text-stone-500">{reply.timestamp}</span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-stone-700">
                        {reply.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              {replyTargetId === comment.id && (
                <form
                  onSubmit={(e) => handleSubmitReply(e, comment.id)}
                  className="mt-3 ml-4 sm:ml-8 flex flex-col sm:flex-row gap-2"
                >
                  <label htmlFor={`reply-input-${comment.id}`} className="sr-only">
                    Reply to {comment.author}
                  </label>
                  <input
                    id={`reply-input-${comment.id}`}
                    type="text"
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${comment.author}...`}
                    className="flex-1 rounded-md border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-xs text-stone-900 focus:border-[#1E3A8A] focus:outline-none min-h-[40px]"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#172554] min-h-[40px] whitespace-nowrap shrink-0"
                  >
                    Send Reply
                  </button>
                </form>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
