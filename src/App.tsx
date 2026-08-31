import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext';
import { Header, BottomNav } from './components/Header';
import { Landing } from './pages/Landing';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Lesson } from './pages/Lesson';
import { Path } from './pages/Path';
import { VocabTasks } from './pages/VocabTasks';
import { Profile } from './pages/Profile';
import type { ReactNode } from 'react';

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/auth" replace />;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-6">{children}</main>
      <BottomNav />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/app/courses"
        element={
          <RequireAuth>
            <Courses />
          </RequireAuth>
        }
      />
      <Route
        path="/app/courses/:courseId"
        element={
          <RequireAuth>
            <CourseDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/app/learn/:courseId/:lessonId"
        element={
          <RequireAuth>
            <Lesson />
          </RequireAuth>
        }
      />
      <Route
        path="/app/path"
        element={
          <RequireAuth>
            <Path />
          </RequireAuth>
        }
      />
      <Route
        path="/app/tasks"
        element={
          <RequireAuth>
            <VocabTasks />
          </RequireAuth>
        }
      />
      <Route
        path="/app/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
