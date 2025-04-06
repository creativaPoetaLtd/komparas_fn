import { useParams, Link } from 'react-router-dom';
import HomeNav from '../home/HomeNav';
import Footer from '../Footer';
import { ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  // Sample blog posts data
  const blogPosts = [
    {
      id: '1',
      title: 'Sample Blog Post 1',
      imageUrl: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1200',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Aenean euismod elementum nisi quis eleifend. Proin mattis nulla nec arcu condimentum, sit amet faucibus dolor finibus.

      ![Sample Image](https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1200)

      Sed auctor, magna a bibendum congue, augue augue tincidunt, iaculis praesent nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent eget risus vitae massa tincidunt dapibus.

      [Learn more about this topic](https://example.com)

      Curabitur in ipsum sit amet lorem semper ornare. Vivamus dignissim, est a efficitur suscipit, nunc enim tincidunt velit, eu malesuada metus urna in risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.`,
      author: 'John Doe',
      date: 'March 15, 2024',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Sample Blog Post 2',
      imageUrl: 'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1200',
      content: `Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam.

      ![Another Image](https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1200)

      Donec sed odio dui. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.

      [Read more details](https://example.com)

      Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur.`,
      author: 'Jane Smith',
      date: 'February 28, 2024',
      readTime: '4 min read'
    },
  ];

  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <HomeNav />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Blog post not found</p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ArrowLeft className="mr-2" /> Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HomeNav />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <Link
          to="/blog"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" /> Back to Blog
        </Link>

        <article className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="relative">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="p-6 md:p-12">
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center text-gray-600 space-x-2 md:space-x-4 text-sm md:text-base">
                <span>{post.author}</span>
                <span className="text-xs">•</span>
                <span>{post.date}</span>
                <span className="text-xs">•</span>
                <span>{post.readTime}</span>
              </div>
            </header>

            <div className="prose prose-sm md:prose-lg prose-blue max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                // Check if the paragraph contains an image or a link
                const isImage = paragraph.startsWith('![');
                const isLink = paragraph.startsWith('[');

                if (isImage) {
                  const match = paragraph.match(/\[(.*?)\]\((.*?)\)/);
                  if (match) {
                    const [, alt, src] = match;
                    return <img key={index} src={src} alt={alt} className="my-4 rounded-lg shadow-md" />;
                  }
                } else if (isLink) {
                  const match = paragraph.match(/\[(.*?)\]\((.*?)\)/);
                  if (match) {
                    const [, text, href] = match;
                    return (
                      <p key={index} className="mb-4">
                        <a href={href} className="text-blue-500 hover:underline">
                          {text}
                        </a>
                      </p>
                    );
                  }
                } else {
                  return <p key={index} className="mb-4">{paragraph.trim()}</p>;
                }
                return null; // Return null if no match is found
              })}
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
