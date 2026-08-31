import { useMemo, useState } from 'react';
import { useApp } from '../store/AppContext';
import { Avatar, Modal, EmptyState } from '../components/ui';
import { classnames } from '../lib/storage';

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return '刚刚';
  if (m < 60) return `${m} 分钟前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} 小时前`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} 天前`;
  return new Date(ts).toLocaleDateString();
}

const TAGS = ['学习心得', '学习求助', '打卡分享', '词汇积累', '资源推荐'];

export function Community() {
  const { posts, user, addPost, toggleLike, addComment } = useApp();
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [composerOpen, setComposerOpen] = useState(false);
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // composer form
  const [cTitle, setCTitle] = useState('');
  const [cContent, setCContent] = useState('');
  const [cTag, setCTag] = useState(TAGS[0]);
  const [cError, setCErr] = useState('');

  const filtered = useMemo(
    () => posts.filter((p) => tagFilter === 'all' || p.tag === tagFilter),
    [posts, tagFilter],
  );

  const openPost = posts.find((p) => p.id === openPostId);

  const submitPost = () => {
    if (!cTitle.trim() || !cContent.trim()) {
      setCErr('标题和内容都要填写哦');
      return;
    }
    addPost({ title: cTitle, content: cContent, language: 'en', tag: cTag });
    setCTitle('');
    setCContent('');
    setCErr('');
    setComposerOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">学习社区</h1>
          <p className="text-ink-600 text-sm mt-1">和同学一起交流英语学习、互助、打卡</p>
        </div>
        <button onClick={() => setComposerOpen(true)} className="btn-primary">+ 发表动态</button>
      </div>

      {/* Tag filter */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        <button
          onClick={() => setTagFilter('all')}
          className={classnames(
            'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
            tagFilter === 'all' ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-ink-600',
          )}
        >
          全部分类
        </button>
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setTagFilter(t)}
            className={classnames(
              'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
              tagFilter === t ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-ink-600',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-3 mt-4">
        {filtered.length === 0 ? (
          <EmptyState icon="🌱" title="这里还很安静" hint="来发表第一条动态吧" />
        ) : (
          filtered.map((p) => {
            const liked = user ? p.likedBy.includes(user.id) : false;
            return (
              <div key={p.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <Avatar emoji={p.avatar} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-ink-900 text-sm">{p.userName}</span>
                      <span className="chip text-[10px] px-2 py-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
                        🇬🇧 英语
                      </span>
                      <span className="chip text-[10px] px-2 py-0">{p.tag}</span>
                      <span className="text-xs text-ink-600 ml-auto">{timeAgo(p.createdAt)}</span>
                    </div>
                    <div className="font-bold text-ink-900 mt-1.5">{p.title}</div>
                    <div className="text-sm text-ink-700 mt-1 whitespace-pre-wrap">{p.content}</div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-ink-600">
                      <button
                        onClick={() => toggleLike(p.id)}
                        disabled={!user}
                        className={classnames('flex items-center gap-1 hover:text-rose-500', liked && 'text-rose-500')}
                      >
                        {liked ? '❤️' : '🤍'} {p.likes}
                      </button>
                      <button onClick={() => { setOpenPostId(p.id); setCommentText(''); }} className="flex items-center gap-1 hover:text-brand-600">
                        💬 {p.comments.length}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Composer Modal */}
      <Modal
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        title="发表学习动态"
        footer={
          <>
            <button onClick={() => setComposerOpen(false)} className="btn-ghost">取消</button>
            <button onClick={submitPost} className="btn-primary">发布</button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <div className="label">分类</div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setCTag(t)}
                  className={classnames(
                    'px-3 py-1 rounded-full text-xs',
                    cTag === t ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-ink-600',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="label">标题</div>
            <input className="input" value={cTitle} onChange={(e) => setCTitle(e.target.value)} placeholder="一句话总结你的动态" />
          </div>
          <div>
            <div className="label">内容</div>
            <textarea
              className="input min-h-[120px] resize-y"
              value={cContent}
              onChange={(e) => setCContent(e.target.value)}
              placeholder="分享你的学习心得、提问或打卡…"
            />
          </div>
          {cError && <div className="text-rose-600 text-sm">{cError}</div>}
        </div>
      </Modal>

      {/* Comments Modal */}
      <Modal open={!!openPost} onClose={() => setOpenPostId(null)} title={openPost?.title}>
        {openPost && (
          <div>
            <div className="text-sm text-ink-700 whitespace-pre-wrap pb-3 border-b border-slate-100">
              {openPost.content}
            </div>
            <div className="mt-3 space-y-3 max-h-[40vh] overflow-auto">
              {openPost.comments.length === 0 ? (
                <div className="text-center text-sm text-ink-600 py-4">还没有评论，来抢沙发～</div>
              ) : (
                openPost.comments.map((c) => (
                  <div key={c.id} className="flex gap-2">
                    <Avatar emoji={c.avatar} size={28} />
                    <div className="flex-1">
                      <div className="text-xs">
                        <b className="text-ink-900">{c.userName}</b>{' '}
                        <span className="text-ink-600">{timeAgo(c.createdAt)}</span>
                      </div>
                      <div className="text-sm text-ink-700">{c.content}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                className="input flex-1"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="写下你的评论…"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && commentText.trim() && openPost) {
                    addComment(openPost.id, commentText.trim());
                    setCommentText('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (commentText.trim() && openPost) {
                    addComment(openPost.id, commentText.trim());
                    setCommentText('');
                  }
                }}
                className="btn-primary"
              >
                发送
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
