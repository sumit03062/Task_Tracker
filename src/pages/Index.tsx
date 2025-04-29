
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { CheckCircle, ListTodo, Users } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Manage Your Projects <span className="text-brand-purple">Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Track tasks, monitor progress, and collaborate with your team using our intuitive task management platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-brand-purple hover:bg-opacity-90 text-lg px-8 py-6"
                onClick={() => navigate('/signup')}
              >
                Get Started for Free
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-brand-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ListTodo className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Task Management</h3>
                <p className="text-gray-600">
                  Create, organize, and track your tasks with an intuitive interface. Never miss a deadline again.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-brand-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multiple Projects</h3>
                <p className="text-gray-600">
                  Manage up to 4 different projects simultaneously. Keep your work organized and separated.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-brand-teal bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-brand-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor task status and project progress with visual indicators. Always know where you stand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-purple py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of users who trust our platform for their project management needs.
            </p>
            <Button 
              className="bg-white text-brand-purple hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => navigate('/signup')}
            >
              Create Free Account
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} Task Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
