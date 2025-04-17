import { Link } from 'react-router-dom';
import HomeNav from '../home/HomeNav';
import Footer from '../Footer';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: '1',
      title: 'Sample Blog Post 1',
      imageUrl: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1200',
      content: 'This is the content of the first sample blog post. You can replace this with your own content.',
      author: 'John Doe',
      date: 'March 15, 2024'
    },
    {
      id: '2',
      title: 'Sample Blog Post 2',
      imageUrl: 'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1200',
      content: 'This is the content of the second sample blog post. You can replace this with your own content.',
      author: 'Jane Smith',
      date: 'February 28, 2024'
    },
    // Add more blog posts as needed
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HomeNav />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Blog
          </h1>
          <p className="text-base md:text-xl text-gray-600 leading-relaxed px-4">
            Discover insights, stories, and inspiration from our team's latest thoughts and experiences.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`} 
              className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity"></div>
                </div>
                
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{post.author}</span>
                      <span className="text-xs">•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;