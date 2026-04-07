import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, HelpCircle, UserCircle, MessageSquare, ChevronDown, ChevronRight, FileText, X, ArrowLeft, Clock, ThumbsUp, ThumbsDown, Shield, Lightbulb, Wrench, Grid3x3, List, Layers, Sparkles, Lock, Mail, Code, Music, Globe, Palette } from 'lucide-react';
import PublicLayout from '@/app/components/PublicLayout';
import '../styles/help-articles.css';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleFeedback, setArticleFeedback] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Comprehensive 100-article help database for Vantalog
  const helpArticles = [
    // Getting Started (15 articles)
    {
      id: 1,
      category: 'Getting Started',
      title: 'How to create an account',
      description: 'Step-by-step guide to register on Vantalog',
      content: `
        <h2>Creating Your Vantalog Account</h2>
        <p>Welcome to Vantalog! Follow these simple steps to create your account:</p>
        <h3>For User Accounts:</h3>
        <ol>
          <li>Visit the Vantalog Login page</li>
          <li>Select "User Access" tab</li>
          <li>Click "Sign Up" to switch to registration mode</li>
          <li>Enter your full name</li>
          <li>Provide a valid email address</li>
          <li>Create a secure password (use the show/hide toggle to verify)</li>
          <li>Click "Create Account"</li>
          <li>Complete the Security Verification process</li>
          <li>You'll be redirected to your User Dashboard</li>
        </ol>
        <h3>For Admin Accounts:</h3>
        <p>Admin access requires approval. Visit the "Admin Request" page from the login screen to submit your application.</p>
      `,
      tags: ['account', 'register', 'signup', 'create'],
      readTime: '3 min'
    },
    {
      id: 2,
      category: 'Getting Started',
      title: 'Understanding Security Verification',
      description: 'How the authenticator page works',
      content: `
        <h2>Security Verification Process</h2>
        <p>After entering your credentials, Vantalog uses a Security Verification step to ensure account security.</p>
        <h3>The Process:</h3>
        <ol>
          <li>Verify you're human by clicking the checkbox</li>
          <li>A security code will be displayed</li>
          <li>Enter the 6-digit code shown</li>
          <li>Click "Verify & Continue"</li>
        </ol>
        <h3>Why Security Verification?</h3>
        <ul>
          <li>Protects your account from unauthorized access</li>
          <li>Prevents automated bot attacks</li>
          <li>Ensures platform integrity</li>
        </ul>
      `,
      tags: ['security', 'verification', 'authenticator', 'login'],
      readTime: '3 min'
    },
    {
      id: 3,
      category: 'Getting Started',
      title: 'Navigating the User Dashboard',
      description: 'Understanding your Vantalog home page',
      content: `
        <h2>Your User Dashboard Overview</h2>
        <p>Your dashboard is the central hub for accessing educational resources.</p>
        <h3>Main Sections:</h3>
        <ul>
          <li><strong>Search Bar:</strong> Quick search for any resource</li>
          <li><strong>Category Cards:</strong> Browse by subject</li>
          <li><strong>Featured Resources:</strong> Curated content</li>
          <li><strong>Quick Stats:</strong> Downloads and favorites</li>
        </ul>
        <h3>Available Categories:</h3>
        <ul>
          <li>Digital Arts - Graphic design, animation, illustration</li>
          <li>Programming - Software development, algorithms</li>
          <li>Music Theory - Composition, notation, harmony</li>
          <li>World Languages - Global languages, linguistics</li>
        </ul>
      `,
      tags: ['dashboard', 'navigation', 'interface', 'home'],
      readTime: '4 min'
    },
    {
      id: 4,
      category: 'Getting Started',
      title: 'First steps after registration',
      description: 'What to do once you create your account',
      content: `
        <h2>Getting Started with Vantalog</h2>
        <p>Congratulations on creating your account! Here's what to do next:</p>
        <h3>Complete Your Profile:</h3>
        <ol>
          <li>Go to "My Profile"</li>
          <li>Add a bio and update your information</li>
          <li>Set your preferences</li>
        </ol>
        <h3>Explore Categories:</h3>
        <p>Browse through our four main categories to discover resources:</p>
        <ul>
          <li>Digital Arts for creative projects</li>
          <li>Programming for coding tutorials</li>
          <li>Music Theory for musical education</li>
          <li>World Languages for language learning</li>
        </ul>
        <h3>Start Building Your Library:</h3>
        <ul>
          <li>Search for topics you're interested in</li>
          <li>Save resources to favorites</li>
          <li>Download materials for offline access</li>
        </ul>
      `,
      tags: ['getting started', 'first steps', 'onboarding', 'new user'],
      readTime: '3 min'
    },
    {
      id: 5,
      category: 'Getting Started',
      title: 'The purple theme design',
      description: 'Understanding Vantalog visual identity',
      content: `
        <h2>Vantalog Design Language</h2>
        <p>Vantalog features a professional purple-themed design throughout the application.</p>
        <h3>Design Elements:</h3>
        <ul>
          <li><strong>Color Palette:</strong> Purple, violet, and amethyst gradients</li>
          <li><strong>Smooth Animations:</strong> Motion effects on interactions</li>
          <li><strong>Glass Morphism:</strong> Frosted glass effects</li>
          <li><strong>Modern Typography:</strong> Easy-to-read fonts</li>
        </ul>
        <h3>Accessibility:</h3>
        <p>The purple theme provides excellent contrast and readability for all users.</p>
      `,
      tags: ['design', 'theme', 'purple', 'UI', 'interface'],
      readTime: '2 min'
    },
    {
      id: 6,
      category: 'Getting Started',
      title: 'Understanding user roles',
      description: 'Learn about User and Admin accounts',
      content: `
        <h2>User Roles on Vantalog</h2>
        <p>Vantalog has two main account types:</p>
        <h3>User Account Features:</h3>
        <ul>
          <li>Browse and search resources</li>
          <li>Download materials</li>
          <li>Save favorites</li>
          <li>View download history</li>
          <li>Submit feedback</li>
        </ul>
        <h3>Admin Account Features:</h3>
        <ul>
          <li>All user capabilities</li>
          <li>Upload new resources</li>
          <li>Manage content</li>
          <li>Review feedback</li>
          <li>Manage user access</li>
          <li>View analytics</li>
        </ul>
      `,
      tags: ['roles', 'account types', 'admin', 'user', 'permissions'],
      readTime: '3 min'
    },
    {
      id: 7,
      category: 'Getting Started',
      title: 'Mobile responsive features',
      description: 'Using Vantalog on mobile devices',
      content: `
        <h2>Vantalog Mobile Experience</h2>
        <p>Access Vantalog seamlessly on any device.</p>
        <h3>Mobile Features:</h3>
        <ul>
          <li>Fully responsive design</li>
          <li>Touch-optimized interface</li>
          <li>Mobile-friendly navigation</li>
          <li>Optimized search experience</li>
        </ul>
        <h3>Mobile Tips:</h3>
        <ul>
          <li>Bookmark for quick access</li>
          <li>Download resources on WiFi</li>
          <li>Use landscape for reading</li>
        </ul>
      `,
      tags: ['mobile', 'responsive', 'touch', 'devices'],
      readTime: '2 min'
    },
    {
      id: 8,
      category: 'Getting Started',
      title: 'Keyboard shortcuts',
      description: 'Speed up your workflow with shortcuts',
      content: `
        <h2>Keyboard Shortcuts</h2>
        <p>Use these shortcuts to navigate Vantalog faster:</p>
        <h3>General Shortcuts:</h3>
        <ul>
          <li><strong>Ctrl/Cmd + K:</strong> Focus search bar</li>
          <li><strong>Esc:</strong> Close modals</li>
          <li><strong>Tab:</strong> Navigate between fields</li>
        </ul>
        <h3>Navigation:</h3>
        <ul>
          <li><strong>H:</strong> Go to Home</li>
          <li><strong>P:</strong> Go to Profile</li>
          <li><strong>F:</strong> View Favorites</li>
        </ul>
      `,
      tags: ['shortcuts', 'keyboard', 'productivity', 'tips'],
      readTime: '2 min'
    },
    {
      id: 9,
      category: 'Getting Started',
      title: 'Setting up your profile',
      description: 'Customize your account settings',
      content: `
        <h2>Personalizing Your Profile</h2>
        <p>Make your Vantalog experience unique:</p>
        <h3>Profile Settings:</h3>
        <ol>
          <li>Click on your profile icon</li>
          <li>Select "My Profile"</li>
          <li>Click "Edit Profile"</li>
          <li>Update your information</li>
        </ol>
        <h3>What You Can Edit:</h3>
        <ul>
          <li>Display name</li>
          <li>Email address</li>
          <li>Bio and description</li>
          <li>Profile preferences</li>
        </ul>
      `,
      tags: ['profile', 'settings', 'customize', 'edit'],
      readTime: '3 min'
    },
    {
      id: 10,
      category: 'Getting Started',
      title: 'Understanding the sidebar navigation',
      description: 'How to use the navigation menu',
      content: `
        <h2>Navigation Menu Guide</h2>
        <p>The sidebar provides quick access to all main features.</p>
        <h3>User Sidebar:</h3>
        <ul>
          <li>Home Dashboard</li>
          <li>Browse Categories</li>
          <li>Search Resources</li>
          <li>My Downloads</li>
          <li>My Favourites</li>
          <li>My Profile</li>
        </ul>
        <h3>Admin Sidebar:</h3>
        <ul>
          <li>Dashboard</li>
          <li>Upload Resource</li>
          <li>Resource Management</li>
          <li>User Access</li>
          <li>Feedback Review</li>
          <li>My Profile</li>
        </ul>
      `,
      tags: ['navigation', 'sidebar', 'menu', 'interface'],
      readTime: '2 min'
    },
    {
      id: 11,
      category: 'Getting Started',
      title: 'Tour of the homepage',
      description: 'Understanding the main page layout',
      content: `
        <h2>Homepage Overview</h2>
        <p>Your homepage is designed for easy access to resources.</p>
        <h3>Top Section:</h3>
        <ul>
          <li>Search bar for quick queries</li>
          <li>Welcome message</li>
          <li>Quick stats display</li>
        </ul>
        <h3>Category Cards:</h3>
        <p>Four main categories displayed with:</p>
        <ul>
          <li>Category icon</li>
          <li>Category name</li>
          <li>Resource count</li>
          <li>Quick access button</li>
        </ul>
        <h3>Featured Section:</h3>
        <p>Highlighted resources selected by our team.</p>
      `,
      tags: ['homepage', 'layout', 'overview', 'tour'],
      readTime: '3 min'
    },
    {
      id: 12,
      category: 'Getting Started',
      title: 'How to request admin access',
      description: 'Complete guide to apply for admin privileges',
      content: `
        <h2>Admin Account Application</h2>
        <p>Want to contribute to Vantalog? Here's how to request admin access:</p>
        <h3>Step-by-Step Application Process:</h3>
        <ol>
          <li>Go to the Vantalog Login page</li>
          <li>Click "Need admin access? Request Here" link at the bottom</li>
          <li>You'll be redirected to the Admin Request page</li>
          <li>Fill out the complete Admin Request form with:</li>
          <ul>
            <li><strong>Full Name:</strong> Your legal name</li>
            <li><strong>Display Name:</strong> How you want to appear in the system</li>
            <li><strong>Email Address:</strong> Professional email recommended</li>
            <li><strong>Password:</strong> Create a secure password for your account</li>
          </ul>
          <li>Click "Submit Request" button</li>
          <li>Wait for the confirmation animation (purple gradient with confetti)</li>
          <li>Check your email for confirmation</li>
          <li>You'll be automatically redirected to login after 15 seconds</li>
        </ol>
        <h3>What Happens Next:</h3>
        <ul>
          <li>Your request is sent to lmno1432@gmail.com (Vantalog Admin Team)</li>
          <li>Admin team reviews your application</li>
          <li>You'll receive a response within 24-48 hours</li>
          <li>If approved, you'll be notified via email with activation instructions</li>
          <li>If denied, you'll receive feedback on the decision</li>
        </ul>
        <h3>Tips for Approval:</h3>
        <ul>
          <li>Use a professional email address (avoid temporary emails)</li>
          <li>Provide accurate and complete information</li>
          <li>Choose a display name that's appropriate and professional</li>
          <li>Create a strong, secure password</li>
          <li>Explain your intended use if contacted</li>
        </ul>
        <h3>After Approval:</h3>
        <p>Once approved, you can log in as an admin and access features like:</p>
        <ul>
          <li>Upload new resources</li>
          <li>Manage existing content</li>
          <li>Review user feedback</li>
          <li>Manage user access</li>
          <li>View platform analytics</li>
        </ul>
      `,
      tags: ['admin', 'request', 'application', 'access', 'privileges', 'approval'],
      readTime: '5 min'
    },
    {
      id: 13,
      category: 'Getting Started',
      title: 'System requirements',
      description: 'Technical requirements for Vantalog',
      content: `
        <h2>System Requirements</h2>
        <p>Vantalog works on most modern devices and browsers.</p>
        <h3>Minimum Requirements:</h3>
        <ul>
          <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
          <li>JavaScript enabled</li>
          <li>Cookies enabled</li>
          <li>Stable internet connection</li>
        </ul>
        <h3>Recommended:</h3>
        <ul>
          <li>Latest browser version</li>
          <li>High-speed internet</li>
          <li>Screen resolution 1280x720 or higher</li>
        </ul>
      `,
      tags: ['requirements', 'system', 'technical', 'browser'],
      readTime: '2 min'
    },
    {
      id: 14,
      category: 'Getting Started',
      title: 'Page transition animations',
      description: 'Understanding loading animations',
      content: `
        <h2>Page Transitions</h2>
        <p>Vantalog features smooth page transitions for a better experience.</p>
        <h3>The Rotating Book Animation:</h3>
        <p>When navigating between pages, you'll see an animated rotating book representing knowledge.</p>
        <h3>When It Appears:</h3>
        <ul>
          <li>Logging in</li>
          <li>Navigating between sections</li>
          <li>Loading resources</li>
        </ul>
        <h3>Purpose:</h3>
        <p>The 5-second animation provides smooth transitions while content loads.</p>
      `,
      tags: ['animation', 'transition', 'loading', 'effects'],
      readTime: '2 min'
    },
    {
      id: 15,
      category: 'Getting Started',
      title: 'Quick start guide',
      description: 'Get up and running in 5 minutes',
      content: `
        <h2>5-Minute Quick Start</h2>
        <p>Get started with Vantalog quickly:</p>
        <h3>Step 1: Create Account (1 min)</h3>
        <p>Register with your email and complete verification.</p>
        <h3>Step 2: Explore Categories (2 min)</h3>
        <p>Browse Digital Arts, Programming, Music Theory, or World Languages.</p>
        <h3>Step 3: Search & Save (2 min)</h3>
        <p>Search for topics, download resources, and save favorites.</p>
        <h3>You're Ready!</h3>
        <p>Start building your educational resource library.</p>
      `,
      tags: ['quick start', 'guide', 'tutorial', 'beginner'],
      readTime: '2 min'
    },

    // Finding Resources (15 articles)
    {
      id: 16,
      category: 'Finding Resources',
      title: 'How to search for resources',
      description: 'Using the search feature effectively',
      content: `
        <h2>Searching on Vantalog</h2>
        <p>Find educational materials quickly:</p>
        <h3>Basic Search:</h3>
        <ol>
          <li>Enter keywords in the search bar</li>
          <li>Press Enter or click search icon</li>
          <li>Browse results</li>
        </ol>
        <h3>Search Tips:</h3>
        <ul>
          <li>Use specific keywords</li>
          <li>Try subject names</li>
          <li>Use quotation marks for exact phrases</li>
        </ul>
      `,
      tags: ['search', 'find', 'resources', 'query'],
      readTime: '3 min'
    },
    {
      id: 17,
      category: 'Finding Resources',
      title: 'Browsing by category',
      description: 'Explore resources by subject',
      content: `
        <h2>Browse Categories</h2>
        <p>Vantalog organizes resources into four main categories:</p>
        <h3>Digital Arts:</h3>
        <p>Graphic design, animation, digital illustration, visual arts</p>
        <h3>Programming:</h3>
        <p>Software development, algorithms, data structures, computer science</p>
        <h3>Music Theory:</h3>
        <p>Composition, notation, harmony, musical analysis</p>
        <h3>World Languages:</h3>
        <p>Global languages, linguistics, culture, communication</p>
      `,
      tags: ['browse', 'category', 'subject', 'topics'],
      readTime: '3 min'
    },
    {
      id: 18,
      category: 'Finding Resources',
      title: 'Saving favorite resources',
      description: 'Bookmark resources for later',
      content: `
        <h2>My Favourites Feature</h2>
        <p>Save resources you love:</p>
        <h3>How to Save:</h3>
        <ol>
          <li>Find a resource</li>
          <li>Click the heart icon</li>
          <li>Resource added to favorites</li>
        </ol>
        <h3>Accessing Favorites:</h3>
        <ol>
          <li>Go to "My Profile"</li>
          <li>Click "My Favourites" tab</li>
          <li>View all saved resources</li>
        </ol>
      `,
      tags: ['favorites', 'save', 'bookmark', 'heart'],
      readTime: '2 min'
    },
    {
      id: 19,
      category: 'Finding Resources',
      title: 'Downloading materials',
      description: 'Download resources for offline use',
      content: `
        <h2>Downloading Resources</h2>
        <p>Access materials offline:</p>
        <h3>Download Process:</h3>
        <ol>
          <li>Find a resource</li>
          <li>Click "Download" button</li>
          <li>File saves to your device</li>
        </ol>
        <h3>Download History:</h3>
        <p>Track all downloads in "My Profile" → "My Downloads"</p>
        <h3>Supported Formats:</h3>
        <ul>
          <li>PDF documents</li>
          <li>Images (JPG, PNG, SVG)</li>
          <li>Videos (MP4)</li>
          <li>Audio (MP3)</li>
        </ul>
      `,
      tags: ['download', 'offline', 'materials', 'files'],
      readTime: '3 min'
    },
    {
      id: 20,
      category: 'Finding Resources',
      title: 'Using filters and sorting',
      description: 'Refine your search results',
      content: `
        <h2>Filters and Sorting</h2>
        <p>Narrow down search results:</p>
        <h3>Available Filters:</h3>
        <ul>
          <li>Category filter</li>
          <li>Resource type</li>
          <li>Date added</li>
          <li>Popularity</li>
        </ul>
        <h3>Sorting Options:</h3>
        <ul>
          <li>Most recent</li>
          <li>Most popular</li>
          <li>Alphabetical</li>
          <li>Relevance</li>
        </ul>
      `,
      tags: ['filter', 'sort', 'search', 'refine'],
      readTime: '2 min'
    },
    {
      id: 21,
      category: 'Finding Resources',
      title: 'Digital Arts resources',
      description: 'Exploring creative materials',
      content: `
        <h2>Digital Arts Category</h2>
        <p>Find resources for creative projects:</p>
        <h3>Available Topics:</h3>
        <ul>
          <li>Graphic Design - Logos, layouts, typography</li>
          <li>Animation - 2D/3D animation techniques</li>
          <li>Digital Illustration - Drawing, painting</li>
          <li>Photo Editing - Retouching, manipulation</li>
        </ul>
        <h3>Resource Types:</h3>
        <ul>
          <li>Tutorials and guides</li>
          <li>Templates</li>
          <li>Video courses</li>
          <li>Project files</li>
        </ul>
      `,
      tags: ['digital arts', 'creative', 'design', 'graphics'],
      readTime: '3 min'
    },
    {
      id: 22,
      category: 'Finding Resources',
      title: 'Programming resources',
      description: 'Coding tutorials and materials',
      content: `
        <h2>Programming Category</h2>
        <p>Learn software development:</p>
        <h3>Available Topics:</h3>
        <ul>
          <li>Web Development - HTML, CSS, JavaScript</li>
          <li>Programming Languages - Python, Java, C++</li>
          <li>Data Structures & Algorithms</li>
          <li>Software Engineering</li>
        </ul>
        <h3>Resource Types:</h3>
        <ul>
          <li>Code examples</li>
          <li>Video tutorials</li>
          <li>Documentation</li>
          <li>Practice exercises</li>
        </ul>
      `,
      tags: ['programming', 'coding', 'development', 'software'],
      readTime: '3 min'
    },
    {
      id: 23,
      category: 'Finding Resources',
      title: 'Music Theory resources',
      description: 'Musical education materials',
      content: `
        <h2>Music Theory Category</h2>
        <p>Explore musical education:</p>
        <h3>Available Topics:</h3>
        <ul>
          <li>Composition - Writing music</li>
          <li>Notation - Reading and writing</li>
          <li>Harmony - Chord progressions</li>
          <li>Analysis - Understanding structure</li>
        </ul>
        <h3>Resource Types:</h3>
        <ul>
          <li>Sheet music</li>
          <li>Audio examples</li>
          <li>Video lessons</li>
          <li>Theory guides</li>
        </ul>
      `,
      tags: ['music', 'theory', 'composition', 'education'],
      readTime: '3 min'
    },
    {
      id: 24,
      category: 'Finding Resources',
      title: 'World Languages resources',
      description: 'Language learning materials',
      content: `
        <h2>World Languages Category</h2>
        <p>Learn global languages:</p>
        <h3>Available Topics:</h3>
        <ul>
          <li>Language Learning - Grammar, vocabulary</li>
          <li>Linguistics - Language structure</li>
          <li>Culture - Cultural context</li>
          <li>Communication - Conversation practice</li>
        </ul>
        <h3>Resource Types:</h3>
        <ul>
          <li>Audio lessons</li>
          <li>Vocabulary lists</li>
          <li>Grammar guides</li>
          <li>Cultural materials</li>
        </ul>
      `,
      tags: ['languages', 'learning', 'linguistics', 'culture'],
      readTime: '3 min'
    },
    {
      id: 25,
      category: 'Finding Resources',
      title: 'Advanced search techniques',
      description: 'Pro tips for finding resources',
      content: `
        <h2>Advanced Search</h2>
        <p>Master the search feature:</p>
        <h3>Search Operators:</h3>
        <ul>
          <li><strong>Exact match:</strong> Use quotes "web development"</li>
          <li><strong>Exclude:</strong> Use minus -beginner</li>
          <li><strong>OR search:</strong> python OR java</li>
        </ul>
        <h3>Best Practices:</h3>
        <ul>
          <li>Start broad, then narrow</li>
          <li>Use specific terms</li>
          <li>Try different keywords</li>
          <li>Use category filters</li>
        </ul>
      `,
      tags: ['search', 'advanced', 'techniques', 'tips'],
      readTime: '4 min'
    },
    {
      id: 26,
      category: 'Finding Resources',
      title: 'Resource quality indicators',
      description: 'How to identify quality materials',
      content: `
        <h2>Evaluating Resource Quality</h2>
        <p>Choose the best resources:</p>
        <h3>Quality Indicators:</h3>
        <ul>
          <li>Detailed descriptions</li>
          <li>Complete metadata</li>
          <li>Professional formatting</li>
          <li>Regular updates</li>
        </ul>
        <h3>Admin Review:</h3>
        <p>All resources are reviewed by our admin team for quality and accuracy.</p>
      `,
      tags: ['quality', 'evaluation', 'standards', 'review'],
      readTime: '2 min'
    },
    {
      id: 27,
      category: 'Finding Resources',
      title: 'Featured resources',
      description: 'Discovering curated content',
      content: `
        <h2>Featured Content</h2>
        <p>Vantalog highlights quality resources:</p>
        <h3>What Gets Featured:</h3>
        <ul>
          <li>High-quality materials</li>
          <li>Popular resources</li>
          <li>New additions</li>
          <li>Timely content</li>
        </ul>
        <h3>How to Find Featured:</h3>
        <p>Featured resources appear on your dashboard homepage.</p>
      `,
      tags: ['featured', 'curated', 'popular', 'quality'],
      readTime: '2 min'
    },
    {
      id: 28,
      category: 'Finding Resources',
      title: 'Resource file formats',
      description: 'Understanding file types',
      content: `
        <h2>Supported File Formats</h2>
        <p>Vantalog supports various formats:</p>
        <h3>Document Formats:</h3>
        <ul>
          <li>PDF - Documents, guides</li>
          <li>DOCX - Editable documents</li>
          <li>TXT - Text files</li>
        </ul>
        <h3>Media Formats:</h3>
        <ul>
          <li>MP4 - Video content</li>
          <li>MP3 - Audio files</li>
          <li>JPG/PNG - Images</li>
        </ul>
      `,
      tags: ['formats', 'files', 'types', 'supported'],
      readTime: '2 min'
    },
    {
      id: 29,
      category: 'Finding Resources',
      title: 'Managing download history',
      description: 'Track your downloads',
      content: `
        <h2>Download History</h2>
        <p>Keep track of all downloaded resources:</p>
        <h3>Accessing History:</h3>
        <ol>
          <li>Go to "My Profile"</li>
          <li>Click "My Downloads"</li>
          <li>View complete history</li>
        </ol>
        <h3>What You'll See:</h3>
        <ul>
          <li>Resource name</li>
          <li>Download date</li>
          <li>File type</li>
          <li>Quick re-download option</li>
        </ul>
      `,
      tags: ['downloads', 'history', 'tracking', 'management'],
      readTime: '2 min'
    },
    {
      id: 30,
      category: 'Finding Resources',
      title: 'Creating resource collections',
      description: 'Organize your saved materials',
      content: `
        <h2>Organizing Resources</h2>
        <p>Use favorites to create collections:</p>
        <h3>Organization Tips:</h3>
        <ul>
          <li>Save related resources together</li>
          <li>Use meaningful names</li>
          <li>Regular review and cleanup</li>
          <li>Download frequently used items</li>
        </ul>
        <h3>Best Practices:</h3>
        <p>Keep your favorites organized by topic or project for easy access.</p>
      `,
      tags: ['organization', 'collections', 'favorites', 'management'],
      readTime: '3 min'
    },

    // Account Management (15 articles)
    {
      id: 31,
      category: 'Account Management',
      title: 'Resetting your password (Forgot Password)',
      description: 'Complete guide to recover a forgotten password',
      content: `
        <h2>Password Recovery Process</h2>
        <p>Forgot your password? Follow this complete guide to reset it:</p>
        <h3>Step-by-Step Reset Process:</h3>
        <ol>
          <li>Go to the Vantalog Login page</li>
          <li>Select the appropriate tab (User Access or Admin Access)</li>
          <li>Click the "Forgot password?" link below the password field</li>
          <li>You'll be redirected to the Forgot Password page</li>
          <li>Enter your registered email address</li>
          <li>Click "Send Reset Instructions" button</li>
          <li>Wait for the confirmation animation with falling confetti and checkmark</li>
          <li>Check your email inbox (and spam folder)</li>
          <li>Open the password reset email from Vantalog</li>
          <li>Follow the instructions in the email to create a new password</li>
        </ol>
        <h3>What to Expect:</h3>
        <ul>
          <li>Purple gradient background with confetti animation appears</li>
          <li>Confirmation message: "Your password reset request has been submitted"</li>
          <li>Email arrives within 5-10 minutes</li>
          <li>Reset link expires after 24 hours</li>
          <li>Automatic redirect to login after 15 seconds</li>
        </ul>
        <h3>Password Requirements:</h3>
        <ul>
          <li>Minimum 8 characters recommended</li>
          <li>Mix of uppercase and lowercase letters</li>
          <li>Include numbers and special characters</li>
          <li>Avoid common words and personal information</li>
          <li>Use the show/hide toggle to verify your new password</li>
        </ul>
        <h3>Troubleshooting:</h3>
        <p>If you don't receive the email:</p>
        <ul>
          <li>Check your spam/junk folder</li>
          <li>Verify you entered the correct email address</li>
          <li>Wait 10-15 minutes for delivery</li>
          <li>Try the reset process again</li>
          <li>Contact support if issues persist</li>
        </ul>
      `,
      tags: ['password', 'reset', 'forgot', 'recovery', 'email', 'login'],
      readTime: '5 min'
    },
    {
      id: 32,
      category: 'Account Management',
      title: 'Changing your password while logged in',
      description: 'Update your password for better security',
      content: `
        <h2>How to Change Your Password</h2>
        <p>Want to update your password for security? Here's how:</p>
        <h3>For Logged-In Users:</h3>
        <ol>
          <li>Navigate to "My Profile" from the sidebar</li>
          <li>Click on "Edit Profile" or "Account Settings"</li>
          <li>Find the "Security" or "Password" section</li>
          <li>Click "Change Password"</li>
          <li>Enter your current password</li>
          <li>Enter your new password</li>
          <li>Confirm your new password</li>
          <li>Click "Update Password" to save changes</li>
        </ol>
        <h3>Best Practices:</h3>
        <ul>
          <li>Change passwords every 3-6 months</li>
          <li>Never reuse old passwords</li>
          <li>Don't share passwords with anyone</li>
          <li>Use unique passwords for different accounts</li>
          <li>Consider using a password manager</li>
        </ul>
        <h3>Strong Password Tips:</h3>
        <ul>
          <li>Length: At least 12 characters</li>
          <li>Complexity: Mix uppercase, lowercase, numbers, symbols</li>
          <li>Uniqueness: Don't use dictionary words</li>
          <li>Avoid: Birthdays, names, common phrases</li>
        </ul>
        <h3>If You Forgot Your Current Password:</h3>
        <p>Log out and use the "Forgot Password" feature from the login page to reset it via email.</p>
      `,
      tags: ['password', 'change', 'update', 'security', 'account', 'profile'],
      readTime: '4 min'
    },
    {
      id: 33,
      category: 'Account Management',
      title: 'Updating your email address',
      description: 'Change your account email',
      content: `
        <h2>Email Address Update</h2>
        <p>Need to change your email?</p>
        <h3>Steps:</h3>
        <ol>
          <li>Go to your Profile</li>
          <li>Click "Edit Profile"</li>
          <li>Update email field</li>
          <li>Click "Save Changes"</li>
          <li>Verify new email</li>
        </ol>
        <h3>Important:</h3>
        <p>You'll receive a verification email at your new address.</p>
      `,
      tags: ['email', 'update', 'change', 'account'],
      readTime: '2 min'
    },
    {
      id: 34,
      category: 'Account Management',
      title: 'Changing your display name',
      description: 'Update how your name appears',
      content: `
        <h2>Display Name Changes</h2>
        <p>Update your display name easily:</p>
        <h3>How to Change:</h3>
        <ol>
          <li>Navigate to "My Profile"</li>
          <li>Click "Edit Profile"</li>
          <li>Update "Display Name" field</li>
          <li>Save your changes</li>
        </ol>
        <h3>Name Guidelines:</h3>
        <ul>
          <li>Use your real name or pseudonym</li>
          <li>Avoid special characters</li>
          <li>Keep it professional</li>
        </ul>
      `,
      tags: ['name', 'display', 'profile', 'update'],
      readTime: '2 min'
    },
    {
      id: 35,
      category: 'Account Management',
      title: 'Managing notification preferences',
      description: 'Control your email notifications',
      content: `
        <h2>Notification Settings</h2>
        <p>Customize what emails you receive:</p>
        <h3>Available Notifications:</h3>
        <ul>
          <li>New resource uploads</li>
          <li>Featured content updates</li>
          <li>Admin announcements</li>
          <li>Security alerts</li>
        </ul>
        <h3>Managing Preferences:</h3>
        <p>Visit Profile Settings to enable/disable specific notification types.</p>
      `,
      tags: ['notifications', 'email', 'preferences', 'settings'],
      readTime: '2 min'
    },
    {
      id: 36,
      category: 'Account Management',
      title: 'Viewing account activity',
      description: 'Monitor your account usage',
      content: `
        <h2>Account Activity</h2>
        <p>Track your Vantalog usage:</p>
        <h3>What You Can See:</h3>
        <ul>
          <li>Login history</li>
          <li>Download count</li>
          <li>Favorites count</li>
          <li>Search history</li>
        </ul>
        <h3>Accessing Activity:</h3>
        <p>View activity in your Profile under the "Activity" tab.</p>
      `,
      tags: ['activity', 'history', 'tracking', 'usage'],
      readTime: '2 min'
    },
    {
      id: 37,
      category: 'Account Management',
      title: 'Deactivating your account',
      description: 'Temporarily disable your account',
      content: `
        <h2>Account Deactivation</h2>
        <p>Need a break? Deactivate temporarily:</p>
        <h3>Deactivation Process:</h3>
        <ol>
          <li>Go to Profile Settings</li>
          <li>Find "Account Management"</li>
          <li>Click "Deactivate Account"</li>
          <li>Confirm your choice</li>
        </ol>
        <h3>What Happens:</h3>
        <ul>
          <li>Account becomes inactive</li>
          <li>Data is preserved</li>
          <li>Can reactivate anytime</li>
        </ul>
      `,
      tags: ['deactivate', 'disable', 'account', 'temporary'],
      readTime: '2 min'
    },
    {
      id: 38,
      category: 'Account Management',
      title: 'Deleting your account',
      description: 'Permanently remove your account',
      content: `
        <h2>Account Deletion</h2>
        <p>Warning: This action is permanent!</p>
        <h3>Deletion Process:</h3>
        <ol>
          <li>Contact support</li>
          <li>Request account deletion</li>
          <li>Confirm your identity</li>
          <li>Account will be removed</li>
        </ol>
        <h3>What Gets Deleted:</h3>
        <ul>
          <li>All personal information</li>
          <li>Download history</li>
          <li>Saved favorites</li>
          <li>Profile data</li>
        </ul>
      `,
      tags: ['delete', 'remove', 'account', 'permanent'],
      readTime: '3 min'
    },
    {
      id: 39,
      category: 'Account Management',
      title: 'Switching between accounts',
      description: 'Manage multiple accounts',
      content: `
        <h2>Multiple Account Management</h2>
        <p>Have both user and admin accounts?</p>
        <h3>Switching Accounts:</h3>
        <ol>
          <li>Log out of current account</li>
          <li>Return to login page</li>
          <li>Select appropriate account type</li>
          <li>Log in with credentials</li>
        </ol>
        <h3>Tips:</h3>
        <ul>
          <li>Use different emails for each account</li>
          <li>Remember which account has what access</li>
        </ul>
      `,
      tags: ['accounts', 'switching', 'multiple', 'management'],
      readTime: '2 min'
    },
    {
      id: 40,
      category: 'Account Management',
      title: 'Profile privacy settings',
      description: 'Control what others see',
      content: `
        <h2>Privacy Controls</h2>
        <p>Manage your profile visibility:</p>
        <h3>Privacy Options:</h3>
        <ul>
          <li>Profile visibility</li>
          <li>Activity sharing</li>
          <li>Download history privacy</li>
          <li>Contact information</li>
        </ul>
        <h3>Recommended Settings:</h3>
        <p>Keep personal information private for security.</p>
      `,
      tags: ['privacy', 'settings', 'visibility', 'security'],
      readTime: '3 min'
    },
    {
      id: 41,
      category: 'Account Management',
      title: 'Two-factor authentication',
      description: 'Extra security for your account',
      content: `
        <h2>Two-Factor Authentication</h2>
        <p>Vantalog uses security verification for all logins.</p>
        <h3>How It Works:</h3>
        <ol>
          <li>Enter your credentials</li>
          <li>Complete verification challenge</li>
          <li>Enter displayed code</li>
          <li>Access granted</li>
        </ol>
        <h3>Benefits:</h3>
        <ul>
          <li>Enhanced security</li>
          <li>Protection from unauthorized access</li>
          <li>Peace of mind</li>
        </ul>
      `,
      tags: ['security', '2FA', 'authentication', 'protection'],
      readTime: '3 min'
    },
    {
      id: 42,
      category: 'Account Management',
      title: 'Session management',
      description: 'Understanding login sessions',
      content: `
        <h2>Login Sessions</h2>
        <p>How Vantalog manages your logged-in state:</p>
        <h3>Session Details:</h3>
        <ul>
          <li>Sessions last until you log out</li>
          <li>Auto-logout after inactivity</li>
          <li>Separate sessions per device</li>
        </ul>
        <h3>Security Tips:</h3>
        <ul>
          <li>Always log out on shared computers</li>
          <li>Don't save passwords on public devices</li>
          <li>Monitor active sessions</li>
        </ul>
      `,
      tags: ['session', 'login', 'security', 'management'],
      readTime: '2 min'
    },
    {
      id: 43,
      category: 'Account Management',
      title: 'Recovering a deleted account',
      description: 'Can you restore a deleted account?',
      content: `
        <h2>Account Recovery</h2>
        <p>Important information about deleted accounts:</p>
        <h3>Recovery Policy:</h3>
        <p>Once an account is deleted, it cannot be recovered. All data is permanently removed.</p>
        <h3>Before Deleting:</h3>
        <ul>
          <li>Download important resources</li>
          <li>Save any data you need</li>
          <li>Consider deactivation instead</li>
        </ul>
        <h3>Starting Fresh:</h3>
        <p>You can always create a new account with the same email after deletion.</p>
      `,
      tags: ['recovery', 'deleted', 'account', 'restore'],
      readTime: '2 min'
    },
    {
      id: 44,
      category: 'Account Management',
      title: 'Updating profile information',
      description: 'Keep your profile current',
      content: `
        <h2>Profile Updates</h2>
        <p>Regularly update your profile information:</p>
        <h3>Editable Fields:</h3>
        <ul>
          <li>Full name</li>
          <li>Display name</li>
          <li>Email address</li>
          <li>Bio/description</li>
        </ul>
        <h3>Best Practices:</h3>
        <ul>
          <li>Keep information accurate</li>
          <li>Update email if it changes</li>
          <li>Review profile monthly</li>
        </ul>
      `,
      tags: ['profile', 'update', 'information', 'edit'],
      readTime: '2 min'
    },
    {
      id: 45,
      category: 'Account Management',
      title: 'Account verification status',
      description: 'Understanding verification badges',
      content: `
        <h2>Account Verification</h2>
        <p>Vantalog verifies accounts for security:</p>
        <h3>Verification Process:</h3>
        <ul>
          <li>Email verification required at signup</li>
          <li>Security verification on each login</li>
          <li>Admin accounts undergo approval</li>
        </ul>
        <h3>Benefits:</h3>
        <ul>
          <li>Enhanced security</li>
          <li>Trusted platform</li>
          <li>Protected accounts</li>
        </ul>
      `,
      tags: ['verification', 'account', 'security', 'status'],
      readTime: '2 min'
    },
    {
      id: 46,
      category: 'Account Management',
      title: 'Managing data and privacy',
      description: 'Your data rights and controls',
      content: `
        <h2>Data Management</h2>
        <p>You control your personal data:</p>
        <h3>Your Rights:</h3>
        <ul>
          <li>Access your data</li>
          <li>Export your data</li>
          <li>Request deletion</li>
          <li>Update information</li>
        </ul>
        <h3>What We Collect:</h3>
        <ul>
          <li>Account information</li>
          <li>Usage data</li>
          <li>Download history</li>
        </ul>
        <p>See our Privacy Policy for full details.</p>
      `,
      tags: ['data', 'privacy', 'rights', 'management'],
      readTime: '3 min'
    },

    // Admin Features (15 articles)
    {
      id: 47,
      category: 'Admin Features',
      title: 'Admin dashboard overview',
      description: 'Understanding the admin panel',
      content: `
        <h2>Admin Dashboard</h2>
        <p>Your control center for managing Vantalog:</p>
        <h3>Main Features:</h3>
        <ul>
          <li><strong>Dashboard:</strong> Statistics and overview</li>
          <li><strong>Upload Resource:</strong> Add new content</li>
          <li><strong>Resource Management:</strong> Edit existing materials</li>
          <li><strong>User Access:</strong> Manage user accounts</li>
          <li><strong>Feedback Review:</strong> Handle user submissions</li>
        </ul>
        <h3>Quick Stats:</h3>
        <p>The dashboard displays total resources, users, and feedback count.</p>
      `,
      tags: ['admin', 'dashboard', 'overview', 'panel'],
      readTime: '3 min'
    },
    {
      id: 48,
      category: 'Admin Features',
      title: 'Uploading new resources',
      description: 'How to add content to Vantalog',
      content: `
        <h2>Resource Upload Guide</h2>
        <p>Contribute educational materials:</p>
        <h3>Upload Process:</h3>
        <ol>
          <li>Go to "Upload Resource"</li>
          <li>Enter resource title</li>
          <li>Select category and subject</li>
          <li>Choose resource type</li>
          <li>Add description</li>
          <li>Upload file</li>
          <li>Review and publish</li>
        </ol>
        <h3>Best Practices:</h3>
        <ul>
          <li>Use descriptive titles</li>
          <li>Add relevant tags</li>
          <li>Ensure file quality</li>
        </ul>
      `,
      tags: ['admin', 'upload', 'resources', 'add'],
      readTime: '4 min'
    },
    {
      id: 49,
      category: 'Admin Features',
      title: 'Managing existing resources',
      description: 'Edit and organize content',
      content: `
        <h2>Resource Management</h2>
        <p>Edit and organize your content:</p>
        <h3>Management Options:</h3>
        <ul>
          <li><strong>Edit:</strong> Update resource details</li>
          <li><strong>Delete:</strong> Remove resources</li>
          <li><strong>Search:</strong> Find specific items</li>
          <li><strong>Filter:</strong> Organize by category</li>
        </ul>
        <h3>How to Manage:</h3>
        <ol>
          <li>Go to "Resource Management"</li>
          <li>Find the resource</li>
          <li>Click action buttons</li>
          <li>Make changes</li>
        </ol>
      `,
      tags: ['admin', 'manage', 'edit', 'resources'],
      readTime: '3 min'
    },
    {
      id: 50,
      category: 'Admin Features',
      title: 'Reviewing user feedback',
      description: 'Handle submissions and comments',
      content: `
        <h2>Feedback Review</h2>
        <p>Monitor and respond to user feedback:</p>
        <h3>Feedback Types:</h3>
        <ul>
          <li>Contact form submissions</li>
          <li>Bug reports</li>
          <li>Feature requests</li>
          <li>General comments</li>
        </ul>
        <h3>Review Process:</h3>
        <ol>
          <li>Access "Feedback Review"</li>
          <li>View submissions</li>
          <li>Read details</li>
          <li>Take appropriate action</li>
        </ol>
      `,
      tags: ['admin', 'feedback', 'review', 'support'],
      readTime: '3 min'
    },
    {
      id: 51,
      category: 'Admin Features',
      title: 'User access management',
      description: 'Control user permissions',
      content: `
        <h2>User Access Control</h2>
        <p>Manage user accounts and permissions:</p>
        <h3>Management Capabilities:</h3>
        <ul>
          <li>View all users</li>
          <li>Activate/deactivate accounts</li>
          <li>Grant admin privileges</li>
          <li>Monitor activity</li>
        </ul>
        <h3>How to Manage:</h3>
        <ol>
          <li>Go to "User Access Management"</li>
          <li>Browse or search users</li>
          <li>View details</li>
          <li>Apply actions</li>
        </ol>
      `,
      tags: ['admin', 'users', 'access', 'permissions'],
      readTime: '3 min'
    },
    {
      id: 52,
      category: 'Admin Features',
      title: 'Resource categorization best practices',
      description: 'How to properly categorize content',
      content: `
        <h2>Categorization Guide</h2>
        <p>Organize resources effectively:</p>
        <h3>Category Selection:</h3>
        <ul>
          <li><strong>Digital Arts:</strong> Design, animation, illustration</li>
          <li><strong>Programming:</strong> Code, development, CS</li>
          <li><strong>Music Theory:</strong> Composition, notation</li>
          <li><strong>World Languages:</strong> Languages, linguistics</li>
        </ul>
        <h3>Tips:</h3>
        <ul>
          <li>Choose the most relevant category</li>
          <li>Use specific subjects</li>
          <li>Add descriptive tags</li>
        </ul>
      `,
      tags: ['admin', 'categorization', 'organization', 'best practices'],
      readTime: '3 min'
    },
    {
      id: 53,
      category: 'Admin Features',
      title: 'Writing effective resource descriptions',
      description: 'Tips for great descriptions',
      content: `
        <h2>Description Writing Guide</h2>
        <p>Create compelling resource descriptions:</p>
        <h3>What to Include:</h3>
        <ul>
          <li>What the resource contains</li>
          <li>Who it's for</li>
          <li>Learning outcomes</li>
          <li>Prerequisites</li>
        </ul>
        <h3>Writing Tips:</h3>
        <ul>
          <li>Be clear and concise</li>
          <li>Use bullet points</li>
          <li>Highlight key features</li>
          <li>Avoid jargon</li>
        </ul>
      `,
      tags: ['admin', 'descriptions', 'writing', 'content'],
      readTime: '4 min'
    },
    {
      id: 54,
      category: 'Admin Features',
      title: 'Managing multiple uploads',
      description: 'Efficiently upload several resources',
      content: `
        <h2>Bulk Upload Tips</h2>
        <p>Upload multiple resources efficiently:</p>
        <h3>Preparation:</h3>
        <ul>
          <li>Organize files beforehand</li>
          <li>Prepare descriptions</li>
          <li>Have metadata ready</li>
          <li>Check file formats</li>
        </ul>
        <h3>Upload Strategy:</h3>
        <ul>
          <li>Upload similar items together</li>
          <li>Use consistent naming</li>
          <li>Tag appropriately</li>
        </ul>
      `,
      tags: ['admin', 'upload', 'bulk', 'efficiency'],
      readTime: '3 min'
    },
    {
      id: 55,
      category: 'Admin Features',
      title: 'Content moderation guidelines',
      description: 'Standards for resource quality',
      content: `
        <h2>Content Moderation</h2>
        <p>Ensure high-quality resources:</p>
        <h3>Quality Standards:</h3>
        <ul>
          <li>Educational value</li>
          <li>Accuracy of information</li>
          <li>Professional formatting</li>
          <li>Appropriate content</li>
        </ul>
        <h3>What to Avoid:</h3>
        <ul>
          <li>Plagiarized content</li>
          <li>Inappropriate material</li>
          <li>Poor quality files</li>
          <li>Irrelevant content</li>
        </ul>
      `,
      tags: ['admin', 'moderation', 'quality', 'standards'],
      readTime: '4 min'
    },
    {
      id: 56,
      category: 'Admin Features',
      title: 'Analytics and reporting',
      description: 'Understanding platform metrics',
      content: `
        <h2>Platform Analytics</h2>
        <p>Track Vantalog performance:</p>
        <h3>Available Metrics:</h3>
        <ul>
          <li>Total resources</li>
          <li>Total users</li>
          <li>Feedback count</li>
          <li>Platform health</li>
        </ul>
        <h3>Using Data:</h3>
        <ul>
          <li>Identify popular content</li>
          <li>Monitor growth</li>
          <li>Improve user experience</li>
        </ul>
      `,
      tags: ['admin', 'analytics', 'metrics', 'reporting'],
      readTime: '3 min'
    },
    {
      id: 57,
      category: 'Admin Features',
      title: 'Responding to user inquiries',
      description: 'Best practices for support',
      content: `
        <h2>User Support Guidelines</h2>
        <p>Provide excellent support:</p>
        <h3>Response Best Practices:</h3>
        <ul>
          <li>Respond within 24 hours</li>
          <li>Be professional and courteous</li>
          <li>Provide clear solutions</li>
          <li>Follow up when needed</li>
        </ul>
        <h3>Common Inquiries:</h3>
        <ul>
          <li>Login issues</li>
          <li>Resource requests</li>
          <li>Technical problems</li>
          <li>Account questions</li>
        </ul>
      `,
      tags: ['admin', 'support', 'inquiries', 'help'],
      readTime: '4 min'
    },
    {
      id: 58,
      category: 'Admin Features',
      title: 'Admin collaboration',
      description: 'Working with other administrators',
      content: `
        <h2>Admin Collaboration</h2>
        <p>Work effectively with your admin team:</p>
        <h3>Collaboration Tips:</h3>
        <ul>
          <li>Communicate regularly</li>
          <li>Divide responsibilities</li>
          <li>Share best practices</li>
          <li>Coordinate uploads</li>
        </ul>
        <h3>Task Distribution:</h3>
        <ul>
          <li>Content upload</li>
          <li>User management</li>
          <li>Feedback review</li>
          <li>Quality control</li>
        </ul>
      `,
      tags: ['admin', 'collaboration', 'teamwork', 'management'],
      readTime: '3 min'
    },
    {
      id: 59,
      category: 'Admin Features',
      title: 'Scheduling content releases',
      description: 'Plan your resource uploads',
      content: `
        <h2>Content Scheduling</h2>
        <p>Plan resource releases strategically:</p>
        <h3>Planning Tips:</h3>
        <ul>
          <li>Create upload calendar</li>
          <li>Balance category distribution</li>
          <li>Consider user needs</li>
          <li>Regular updates</li>
        </ul>
        <h3>Best Practices:</h3>
        <ul>
          <li>Upload consistently</li>
          <li>Avoid bulk dumps</li>
          <li>Quality over quantity</li>
        </ul>
      `,
      tags: ['admin', 'scheduling', 'planning', 'content'],
      readTime: '3 min'
    },
    {
      id: 60,
      category: 'Admin Features',
      title: 'Handling copyright and licensing',
      description: 'Legal considerations for uploads',
      content: `
        <h2>Copyright Guidelines</h2>
        <p>Ensure legal compliance:</p>
        <h3>Upload Requirements:</h3>
        <ul>
          <li>Only upload owned content</li>
          <li>Verify licensing rights</li>
          <li>Respect copyright laws</li>
          <li>Attribute sources</li>
        </ul>
        <h3>Red Flags:</h3>
        <ul>
          <li>Copyrighted materials without permission</li>
          <li>Trademarked content</li>
          <li>Plagiarized work</li>
        </ul>
      `,
      tags: ['admin', 'copyright', 'licensing', 'legal'],
      readTime: '4 min'
    },
    {
      id: 61,
      category: 'Admin Features',
      title: 'Admin profile management',
      description: 'Managing your admin account',
      content: `
        <h2>Admin Account Settings</h2>
        <p>Maintain your admin profile:</p>
        <h3>Profile Options:</h3>
        <ul>
          <li>Update contact information</li>
          <li>Change password</li>
          <li>Set preferences</li>
          <li>Manage notifications</li>
        </ul>
        <h3>Security:</h3>
        <ul>
          <li>Use strong passwords</li>
          <li>Never share credentials</li>
          <li>Log out when done</li>
        </ul>
      `,
      tags: ['admin', 'profile', 'account', 'management'],
      readTime: '3 min'
    },

    // Technical Support (20 articles)
    {
      id: 62,
      category: 'Technical Support',
      title: 'Common login issues',
      description: 'Troubleshooting login problems',
      content: `
        <h2>Login Troubleshooting</h2>
        <p>Resolve common login issues:</p>
        <h3>Common Problems:</h3>
        <ul>
          <li><strong>Wrong Password:</strong> Use "Forgot Password"</li>
          <li><strong>Account Not Found:</strong> Verify email</li>
          <li><strong>Verification Failed:</strong> Complete security check</li>
        </ul>
        <h3>Quick Fixes:</h3>
        <ul>
          <li>Check internet connection</li>
          <li>Clear browser cache</li>
          <li>Try different browser</li>
          <li>Disable extensions</li>
        </ul>
      `,
      tags: ['troubleshooting', 'login', 'issues', 'support'],
      readTime: '3 min'
    },
    {
      id: 63,
      category: 'Technical Support',
      title: 'Browser compatibility',
      description: 'Supported browsers and versions',
      content: `
        <h2>Browser Support</h2>
        <p>Vantalog works on modern browsers:</p>
        <h3>Recommended Browsers:</h3>
        <ul>
          <li>Google Chrome (latest)</li>
          <li>Mozilla Firefox (latest)</li>
          <li>Safari (latest)</li>
          <li>Microsoft Edge (latest)</li>
        </ul>
        <h3>Requirements:</h3>
        <ul>
          <li>JavaScript enabled</li>
          <li>Cookies enabled</li>
          <li>Modern CSS support</li>
        </ul>
      `,
      tags: ['browser', 'compatibility', 'technical', 'support'],
      readTime: '2 min'
    },
    {
      id: 64,
      category: 'Technical Support',
      title: 'Clearing cache and cookies',
      description: 'Fix issues by clearing data',
      content: `
        <h2>Clear Cache Guide</h2>
        <p>Resolve issues by clearing browser data:</p>
        <h3>Chrome:</h3>
        <ol>
          <li>Press Ctrl+Shift+Delete</li>
          <li>Select time range</li>
          <li>Check "Cached images"</li>
          <li>Click "Clear data"</li>
        </ol>
        <h3>Firefox:</h3>
        <ol>
          <li>Press Ctrl+Shift+Delete</li>
          <li>Select items to clear</li>
          <li>Click "Clear Now"</li>
        </ol>
      `,
      tags: ['cache', 'cookies', 'troubleshooting', 'browser'],
      readTime: '3 min'
    },
    {
      id: 65,
      category: 'Technical Support',
      title: 'Download failures',
      description: 'Fixing download problems',
      content: `
        <h2>Download Troubleshooting</h2>
        <p>Resolve download issues:</p>
        <h3>Common Causes:</h3>
        <ul>
          <li>Slow internet connection</li>
          <li>Browser settings</li>
          <li>File size limitations</li>
          <li>Popup blockers</li>
        </ul>
        <h3>Solutions:</h3>
        <ul>
          <li>Check internet speed</li>
          <li>Allow popups from Vantalog</li>
          <li>Try different browser</li>
          <li>Wait and retry</li>
        </ul>
      `,
      tags: ['download', 'issues', 'troubleshooting', 'files'],
      readTime: '3 min'
    },
    {
      id: 66,
      category: 'Technical Support',
      title: 'Upload errors',
      description: 'Fixing file upload problems',
      content: `
        <h2>Upload Error Solutions</h2>
        <p>Resolve file upload issues:</p>
        <h3>Common Errors:</h3>
        <ul>
          <li>File too large</li>
          <li>Unsupported format</li>
          <li>Connection timeout</li>
          <li>Permission issues</li>
        </ul>
        <h3>Fixes:</h3>
        <ul>
          <li>Compress large files</li>
          <li>Check file format</li>
          <li>Stable internet required</li>
          <li>Verify admin permissions</li>
        </ul>
      `,
      tags: ['upload', 'errors', 'troubleshooting', 'admin'],
      readTime: '3 min'
    },
    {
      id: 67,
      category: 'Technical Support',
      title: 'Search not working',
      description: 'Troubleshoot search issues',
      content: `
        <h2>Search Troubleshooting</h2>
        <p>Fix search functionality:</p>
        <h3>Issues:</h3>
        <ul>
          <li>No results found</li>
          <li>Search bar not responding</li>
          <li>Slow search</li>
        </ul>
        <h3>Solutions:</h3>
        <ul>
          <li>Try different keywords</li>
          <li>Refresh page</li>
          <li>Clear cache</li>
          <li>Check internet</li>
        </ul>
      `,
      tags: ['search', 'issues', 'troubleshooting', 'help'],
      readTime: '2 min'
    },
    {
      id: 68,
      category: 'Technical Support',
      title: 'Page loading slowly',
      description: 'Speed up Vantalog performance',
      content: `
        <h2>Performance Optimization</h2>
        <p>Improve loading speeds:</p>
        <h3>Quick Fixes:</h3>
        <ul>
          <li>Clear browser cache</li>
          <li>Close unused tabs</li>
          <li>Check internet speed</li>
          <li>Disable extensions</li>
        </ul>
        <h3>Long-term Solutions:</h3>
        <ul>
          <li>Update browser</li>
          <li>Upgrade internet</li>
          <li>Use recommended browsers</li>
        </ul>
      `,
      tags: ['performance', 'speed', 'loading', 'optimization'],
      readTime: '3 min'
    },
    {
      id: 69,
      category: 'Technical Support',
      title: 'Mobile display issues',
      description: 'Fix mobile viewing problems',
      content: `
        <h2>Mobile Troubleshooting</h2>
        <p>Resolve mobile display issues:</p>
        <h3>Common Problems:</h3>
        <ul>
          <li>Layout broken</li>
          <li>Text too small</li>
          <li>Buttons not working</li>
        </ul>
        <h3>Solutions:</h3>
        <ul>
          <li>Rotate device</li>
          <li>Update browser app</li>
          <li>Clear mobile cache</li>
          <li>Try different browser</li>
        </ul>
      `,
      tags: ['mobile', 'display', 'issues', 'responsive'],
      readTime: '2 min'
    },
    {
      id: 70,
      category: 'Technical Support',
      title: 'Email not received',
      description: 'Missing verification or reset emails',
      content: `
        <h2>Email Issues</h2>
        <p>Not receiving emails from Vantalog?</p>
        <h3>Check:</h3>
        <ul>
          <li>Spam/junk folder</li>
          <li>Email address correct</li>
          <li>Email filters</li>
          <li>Storage full</li>
        </ul>
        <h3>Solutions:</h3>
        <ul>
          <li>Add Vantalog to contacts</li>
          <li>Whitelist our domain</li>
          <li>Wait 10-15 minutes</li>
          <li>Request new email</li>
        </ul>
      `,
      tags: ['email', 'issues', 'verification', 'troubleshooting'],
      readTime: '3 min'
    },
    {
      id: 71,
      category: 'Technical Support',
      title: 'JavaScript errors',
      description: 'Enable JavaScript in your browser',
      content: `
        <h2>JavaScript Required</h2>
        <p>Vantalog requires JavaScript to function:</p>
        <h3>Enable in Chrome:</h3>
        <ol>
          <li>Settings → Privacy and security</li>
          <li>Site settings → JavaScript</li>
          <li>Select "Allowed"</li>
        </ol>
        <h3>Enable in Firefox:</h3>
        <ol>
          <li>Type "about:config" in address bar</li>
          <li>Search "javascript.enabled"</li>
          <li>Set to true</li>
        </ol>
      `,
      tags: ['javascript', 'enable', 'technical', 'browser'],
      readTime: '3 min'
    },
    {
      id: 72,
      category: 'Technical Support',
      title: 'Cookies must be enabled',
      description: 'Enable cookies for Vantalog',
      content: `
        <h2>Cookie Settings</h2>
        <p>Cookies are required for login:</p>
        <h3>Enable in Chrome:</h3>
        <ol>
          <li>Settings → Privacy</li>
          <li>Cookies and site data</li>
          <li>Allow all cookies or add exception</li>
        </ol>
        <h3>Why Needed:</h3>
        <ul>
          <li>Maintain login sessions</li>
          <li>Save preferences</li>
          <li>Security features</li>
        </ul>
      `,
      tags: ['cookies', 'enable', 'settings', 'browser'],
      readTime: '2 min'
    },
    {
      id: 73,
      category: 'Technical Support',
      title: 'How to contact support',
      description: 'Get help using the Contact form',
      content: `
        <h2>Getting Support from Vantalog</h2>
        <p>Need personalized help? We're here for you!</p>
        <h3>Using the Contact Form:</h3>
        <ol>
          <li>Visit the Vantalog public website</li>
          <li>Navigate to the "Contact" page from the menu</li>
          <li>Fill out the contact form with:</li>
          <ul>
            <li><strong>Your Name:</strong> Full name for personalized response</li>
            <li><strong>Email Address:</strong> Where we'll send our reply</li>
            <li><strong>Subject:</strong> Brief summary of your inquiry</li>
            <li><strong>Message:</strong> Detailed description of your question/issue</li>
          </ul>
          <li>Click "Send Message" button</li>
          <li>Wait for the success confirmation animation</li>
          <li>You'll see a purple gradient screen with confetti and checkmark</li>
          <li>Confirmation message: "Your message has been sent successfully"</li>
          <li>Check your email for our confirmation</li>
        </ol>
        <h3>Support Channels:</h3>
        <ul>
          <li><strong>Help Center:</strong> Browse 100+ articles (you're here now!)</li>
          <li><strong>Contact Form:</strong> Direct message to support team</li>
          <li><strong>Email:</strong> lmno1432@gmail.com (from contact form)</li>
          <li><strong>FAQ Page:</strong> Quick answers to common questions</li>
        </ul>
        <h3>What to Include in Your Message:</h3>
        <ul>
          <li><strong>Detailed description:</strong> Explain the issue clearly</li>
          <li><strong>Steps to reproduce:</strong> What actions led to the problem</li>
          <li><strong>Error messages:</strong> Exact text of any error messages</li>
          <li><strong>Account email:</strong> Email associated with your account</li>
          <li><strong>Browser/device:</strong> What you're using to access Vantalog</li>
          <li><strong>Screenshots:</strong> Attach if possible (describe in message)</li>
        </ul>
        <h3>Response Time:</h3>
        <ul>
          <li>Initial response: Within 24 hours</li>
          <li>Full resolution: 24-48 hours for most issues</li>
          <li>Complex issues: May take 2-5 business days</li>
          <li>Emergency issues: Marked as urgent and prioritized</li>
        </ul>
        <h3>Tips for Faster Response:</h3>
        <ul>
          <li>Be specific and detailed in your message</li>
          <li>Check Help Center first for immediate answers</li>
          <li>Use a clear, descriptive subject line</li>
          <li>Include all relevant account information</li>
          <li>Check your spam folder for our reply</li>
        </ul>
      `,
      tags: ['support', 'contact', 'help', 'assistance', 'email', 'form'],
      readTime: '5 min'
    },
    {
      id: 74,
      category: 'Technical Support',
      title: 'Security verification failing',
      description: 'Fix authenticator issues',
      content: `
        <h2>Verification Troubleshooting</h2>
        <p>Issues with security verification?</p>
        <h3>Common Problems:</h3>
        <ul>
          <li>Code not appearing</li>
          <li>Wrong code entered</li>
          <li>Verification timeout</li>
        </ul>
        <h3>Solutions:</h3>
        <ul>
          <li>Click refresh button</li>
          <li>Enter code carefully</li>
          <li>Ensure you complete "I'm not a robot"</li>
          <li>Try different browser</li>
        </ul>
      `,
      tags: ['verification', 'security', 'authenticator', 'issues'],
      readTime: '3 min'
    },
    {
      id: 75,
      category: 'Technical Support',
      title: 'Account locked out',
      description: 'Regain access to your account',
      content: `
        <h2>Account Lockout</h2>
        <p>Locked out of your account?</p>
        <h3>Common Reasons:</h3>
        <ul>
          <li>Too many failed login attempts</li>
          <li>Suspicious activity detected</li>
          <li>Account deactivated</li>
        </ul>
        <h3>Solutions:</h3>
        <ul>
          <li>Wait 30 minutes and retry</li>
          <li>Use "Forgot Password"</li>
          <li>Contact support</li>
          <li>Verify your identity</li>
        </ul>
      `,
      tags: ['locked', 'account', 'access', 'support'],
      readTime: '3 min'
    },
    {
      id: 76,
      category: 'Technical Support',
      title: 'File format errors',
      description: 'Understanding supported formats',
      content: `
        <h2>File Format Support</h2>
        <p>Vantalog supports specific file types:</p>
        <h3>Supported Formats:</h3>
        <ul>
          <li><strong>Documents:</strong> PDF, DOCX, TXT</li>
          <li><strong>Images:</strong> JPG, PNG, SVG</li>
          <li><strong>Audio:</strong> MP3, WAV</li>
          <li><strong>Video:</strong> MP4</li>
        </ul>
        <h3>Conversion Tools:</h3>
        <p>Use online converters if your file isn't supported.</p>
      `,
      tags: ['file formats', 'support', 'compatibility', 'errors'],
      readTime: '2 min'
    },
    {
      id: 77,
      category: 'Technical Support',
      title: 'Connection timeout errors',
      description: 'Fix network connection issues',
      content: `
        <h2>Connection Errors</h2>
        <p>Experiencing timeouts?</p>
        <h3>Causes:</h3>
        <ul>
          <li>Slow internet</li>
          <li>Server busy</li>
          <li>Large file uploads</li>
          <li>Network instability</li>
        </ul>
        <h3>Solutions:</h3>
        <ul>
          <li>Check internet speed</li>
          <li>Try again later</li>
          <li>Use wired connection</li>
          <li>Compress large files</li>
        </ul>
      `,
      tags: ['connection', 'timeout', 'network', 'errors'],
      readTime: '3 min'
    },
    {
      id: 78,
      category: 'Technical Support',
      title: 'Browser extension conflicts',
      description: 'Disable conflicting extensions',
      content: `
        <h2>Extension Conflicts</h2>
        <p>Some extensions may interfere with Vantalog:</p>
        <h3>Common Culprits:</h3>
        <ul>
          <li>Ad blockers</li>
          <li>Privacy extensions</li>
          <li>Script blockers</li>
          <li>Download managers</li>
        </ul>
        <h3>Solution:</h3>
        <ol>
          <li>Try incognito/private mode</li>
          <li>Disable extensions one by one</li>
          <li>Whitelist Vantalog</li>
        </ol>
      `,
      tags: ['extensions', 'conflicts', 'browser', 'troubleshooting'],
      readTime: '3 min'
    },
    {
      id: 79,
      category: 'Technical Support',
      title: 'Data not saving',
      description: 'Why changes aren\'t persisting',
      content: `
        <h2>Save Issues</h2>
        <p>Changes not saving?</p>
        <h3>Common Causes:</h3>
        <ul>
          <li>Not clicking "Save" button</li>
          <li>Connection interrupted</li>
          <li>Browser issues</li>
          <li>Session expired</li>
        </ul>
        <h3>Solutions:</h3>
        <ul>
          <li>Always click "Save Changes"</li>
          <li>Check internet connection</li>
          <li>Refresh and try again</li>
          <li>Log out and back in</li>
        </ul>
      `,
      tags: ['saving', 'data', 'issues', 'persistence'],
      readTime: '2 min'
    },
    {
      id: 80,
      category: 'Technical Support',
      title: 'Screen resolution issues',
      description: 'Optimizing display settings',
      content: `
        <h2>Display Optimization</h2>
        <p>Vantalog works best at certain resolutions:</p>
        <h3>Recommended:</h3>
        <ul>
          <li>Minimum: 1280x720</li>
          <li>Optimal: 1920x1080</li>
          <li>Mobile: Auto-responsive</li>
        </ul>
        <h3>If Issues:</h3>
        <ul>
          <li>Adjust browser zoom (Ctrl +/-)</li>
          <li>Use fullscreen mode (F11)</li>
          <li>Rotate mobile device</li>
        </ul>
      `,
      tags: ['resolution', 'display', 'screen', 'optimization'],
      readTime: '2 min'
    },
    {
      id: 81,
      category: 'Technical Support',
      title: 'Reporting bugs',
      description: 'How to report technical issues',
      content: `
        <h2>Bug Reporting</h2>
        <p>Help us improve Vantalog:</p>
        <h3>What to Report:</h3>
        <ul>
          <li>Unexpected errors</li>
          <li>Broken features</li>
          <li>Display issues</li>
          <li>Performance problems</li>
        </ul>
        <h3>How to Report:</h3>
        <ol>
          <li>Go to Contact page</li>
          <li>Describe the issue</li>
          <li>Include screenshots</li>
          <li>List steps to reproduce</li>
          <li>Mention browser/device</li>
        </ol>
      `,
      tags: ['bugs', 'reporting', 'issues', 'support'],
      readTime: '3 min'
    },

    // Privacy & Security (20 articles)
    {
      id: 82,
      category: 'Privacy & Security',
      title: 'Data privacy and protection',
      description: 'How we protect your information',
      content: `
        <h2>Your Privacy Matters</h2>
        <p>Vantalog is committed to protecting your data:</p>
        <h3>Data We Collect:</h3>
        <ul>
          <li>Account information</li>
          <li>Usage data</li>
          <li>Login activity</li>
        </ul>
        <h3>Protection Measures:</h3>
        <ul>
          <li>Encrypted connections (HTTPS)</li>
          <li>Secure password storage</li>
          <li>Regular security audits</li>
          <li>No third-party sharing</li>
        </ul>
      `,
      tags: ['privacy', 'security', 'data', 'protection'],
      readTime: '4 min'
    },
    {
      id: 83,
      category: 'Privacy & Security',
      title: 'Account security best practices',
      description: 'Tips for keeping your account safe',
      content: `
        <h2>Securing Your Account</h2>
        <p>Follow these best practices:</p>
        <h3>Password Security:</h3>
        <ul>
          <li>Use unique, strong passwords</li>
          <li>Never share passwords</li>
          <li>Change regularly</li>
          <li>Don't reuse passwords</li>
        </ul>
        <h3>Account Protection:</h3>
        <ul>
          <li>Log out on shared devices</li>
          <li>Be cautious of phishing</li>
          <li>Verify URLs</li>
          <li>Report suspicious activity</li>
        </ul>
      `,
      tags: ['security', 'account', 'protection', 'password'],
      readTime: '3 min'
    },
    {
      id: 84,
      category: 'Privacy & Security',
      title: 'Understanding HTTPS',
      description: 'Why the lock icon matters',
      content: `
        <h2>HTTPS Security</h2>
        <p>Vantalog uses HTTPS for secure connections:</p>
        <h3>What is HTTPS?</h3>
        <p>HTTPS encrypts data between your browser and our servers.</p>
        <h3>Benefits:</h3>
        <ul>
          <li>Data encryption</li>
          <li>Identity verification</li>
          <li>Protection from eavesdropping</li>
          <li>Secure logins</li>
        </ul>
        <h3>Check for HTTPS:</h3>
        <p>Look for the lock icon in your browser's address bar.</p>
      `,
      tags: ['HTTPS', 'security', 'encryption', 'protection'],
      readTime: '3 min'
    },
    {
      id: 85,
      category: 'Privacy & Security',
      title: 'Recognizing phishing attempts',
      description: 'Protect yourself from scams',
      content: `
        <h2>Phishing Protection</h2>
        <p>Learn to identify phishing attempts:</p>
        <h3>Warning Signs:</h3>
        <ul>
          <li>Urgent requests for credentials</li>
          <li>Suspicious sender addresses</li>
          <li>Spelling/grammar errors</li>
          <li>Unfamiliar links</li>
        </ul>
        <h3>What to Do:</h3>
        <ul>
          <li>Never click suspicious links</li>
          <li>Verify sender identity</li>
          <li>Type URLs manually</li>
          <li>Report phishing emails</li>
        </ul>
      `,
      tags: ['phishing', 'scams', 'security', 'protection'],
      readTime: '4 min'
    },
    {
      id: 86,
      category: 'Privacy & Security',
      title: 'Password creation guidelines',
      description: 'Creating strong passwords',
      content: `
        <h2>Strong Password Guide</h2>
        <p>Create secure passwords:</p>
        <h3>Requirements:</h3>
        <ul>
          <li>Minimum 8 characters</li>
          <li>Mix of uppercase/lowercase</li>
          <li>Include numbers</li>
          <li>Use special characters</li>
        </ul>
        <h3>Good Practices:</h3>
        <ul>
          <li>Use phrases, not words</li>
          <li>Avoid personal information</li>
          <li>Don't use common passwords</li>
          <li>Use a password manager</li>
        </ul>
      `,
      tags: ['password', 'security', 'creation', 'strong'],
      readTime: '3 min'
    },
    {
      id: 87,
      category: 'Privacy & Security',
      title: 'What data we collect',
      description: 'Transparency about data collection',
      content: `
        <h2>Data Collection Policy</h2>
        <p>Here's what we collect and why:</p>
        <h3>Account Data:</h3>
        <ul>
          <li>Name and email (for account creation)</li>
          <li>Password (encrypted)</li>
        </ul>
        <h3>Usage Data:</h3>
        <ul>
          <li>Downloads (to show your history)</li>
          <li>Favorites (to save preferences)</li>
          <li>Search queries (to improve results)</li>
        </ul>
        <h3>What We Don't Collect:</h3>
        <ul>
          <li>Financial information</li>
          <li>Unnecessary personal data</li>
        </ul>
      `,
      tags: ['data collection', 'privacy', 'transparency', 'policy'],
      readTime: '3 min'
    },
    {
      id: 88,
      category: 'Privacy & Security',
      title: 'Your data rights',
      description: 'Understanding GDPR and data rights',
      content: `
        <h2>Your Rights</h2>
        <p>You have control over your data:</p>
        <h3>Data Rights:</h3>
        <ul>
          <li>Access your data</li>
          <li>Request deletion</li>
          <li>Export your data</li>
          <li>Correct inaccuracies</li>
          <li>Opt out of communications</li>
        </ul>
        <h3>Exercising Rights:</h3>
        <p>Contact us through the support page to exercise these rights.</p>
      `,
      tags: ['data rights', 'GDPR', 'privacy', 'control'],
      readTime: '3 min'
    },
    {
      id: 89,
      category: 'Privacy & Security',
      title: 'Cookie policy',
      description: 'How we use cookies',
      content: `
        <h2>Cookie Usage</h2>
        <p>Understanding cookies on Vantalog:</p>
        <h3>What Are Cookies?</h3>
        <p>Small text files that help remember you.</p>
        <h3>How We Use Them:</h3>
        <ul>
          <li>Maintain login sessions</li>
          <li>Save preferences</li>
          <li>Improve experience</li>
        </ul>
        <h3>Cookie Control:</h3>
        <p>You can manage cookies in your browser settings.</p>
      `,
      tags: ['cookies', 'policy', 'privacy', 'tracking'],
      readTime: '3 min'
    },
    {
      id: 90,
      category: 'Privacy & Security',
      title: 'Third-party services',
      description: 'External services we use',
      content: `
        <h2>Third-Party Services</h2>
        <p>Vantalog may use external services:</p>
        <h3>Services Used:</h3>
        <ul>
          <li>Email service (EmailJS)</li>
          <li>Analytics (if applicable)</li>
          <li>CDN services</li>
        </ul>
        <h3>Data Sharing:</h3>
        <p>We do not share your personal data with third parties for marketing purposes.</p>
      `,
      tags: ['third-party', 'services', 'privacy', 'data'],
      readTime: '3 min'
    },
    {
      id: 91,
      category: 'Privacy & Security',
      title: 'Secure browsing tips',
      description: 'Stay safe online',
      content: `
        <h2>Safe Browsing</h2>
        <p>General security tips:</p>
        <h3>Best Practices:</h3>
        <ul>
          <li>Keep browser updated</li>
          <li>Use antivirus software</li>
          <li>Avoid public WiFi for sensitive tasks</li>
          <li>Enable firewall</li>
        </ul>
        <h3>On Vantalog:</h3>
        <ul>
          <li>Always log out</li>
          <li>Don't share credentials</li>
          <li>Report suspicious activity</li>
        </ul>
      `,
      tags: ['browsing', 'security', 'safety', 'tips'],
      readTime: '3 min'
    },
    {
      id: 92,
      category: 'Privacy & Security',
      title: 'Data retention policy',
      description: 'How long we keep your data',
      content: `
        <h2>Data Retention</h2>
        <p>Understanding data storage:</p>
        <h3>Active Accounts:</h3>
        <p>Data is kept while your account is active.</p>
        <h3>Deleted Accounts:</h3>
        <p>Data is permanently deleted within 30 days of account deletion.</p>
        <h3>Legal Requirements:</h3>
        <p>Some data may be retained longer for legal compliance.</p>
      `,
      tags: ['retention', 'data', 'storage', 'policy'],
      readTime: '2 min'
    },
    {
      id: 93,
      category: 'Privacy & Security',
      title: 'Security breach protocol',
      description: 'What happens if there\'s a breach',
      content: `
        <h2>Security Incident Response</h2>
        <p>Our commitment to security:</p>
        <h3>If a Breach Occurs:</h3>
        <ul>
          <li>Immediate investigation</li>
          <li>User notification</li>
          <li>Mitigation measures</li>
          <li>Transparency</li>
        </ul>
        <h3>Your Actions:</h3>
        <ul>
          <li>Change password immediately</li>
          <li>Monitor account activity</li>
          <li>Contact support</li>
        </ul>
      `,
      tags: ['breach', 'security', 'incident', 'response'],
      readTime: '3 min'
    },
    {
      id: 94,
      category: 'Privacy & Security',
      title: 'Children\'s privacy',
      description: 'COPPA compliance',
      content: `
        <h2>Children's Privacy Protection</h2>
        <p>Vantalog is committed to protecting children:</p>
        <h3>Age Requirements:</h3>
        <p>Users must be 13 years or older to create an account.</p>
        <h3>Parental Consent:</h3>
        <p>Users under 18 should have parental supervision.</p>
        <h3>Data Protection:</h3>
        <p>We do not knowingly collect data from children under 13.</p>
      `,
      tags: ['children', 'COPPA', 'privacy', 'protection'],
      readTime: '2 min'
    },
    {
      id: 95,
      category: 'Privacy & Security',
      title: 'Reporting security issues',
      description: 'How to report vulnerabilities',
      content: `
        <h2>Security Reporting</h2>
        <p>Help us maintain security:</p>
        <h3>What to Report:</h3>
        <ul>
          <li>Security vulnerabilities</li>
          <li>Suspicious activity</li>
          <li>Data breaches</li>
          <li>Account compromises</li>
        </ul>
        <h3>How to Report:</h3>
        <ol>
          <li>Contact support immediately</li>
          <li>Provide detailed information</li>
          <li>Don't exploit vulnerabilities</li>
        </ol>
      `,
      tags: ['reporting', 'security', 'vulnerabilities', 'issues'],
      readTime: '3 min'
    },
    {
      id: 96,
      category: 'Privacy & Security',
      title: 'VPN and proxy usage',
      description: 'Can you use VPNs with Vantalog?',
      content: `
        <h2>VPN Compatibility</h2>
        <p>Using VPNs with Vantalog:</p>
        <h3>VPN Usage:</h3>
        <p>Vantalog works with most VPN services.</p>
        <h3>Potential Issues:</h3>
        <ul>
          <li>Slower connection speeds</li>
          <li>Security verification may be required</li>
        </ul>
        <h3>Best Practices:</h3>
        <ul>
          <li>Use reputable VPN services</li>
          <li>Ensure stable connection</li>
        </ul>
      `,
      tags: ['VPN', 'proxy', 'security', 'compatibility'],
      readTime: '2 min'
    },
    {
      id: 97,
      category: 'Privacy & Security',
      title: 'Secure password recovery',
      description: 'Safe password reset process',
      content: `
        <h2>Password Recovery Security</h2>
        <p>Our secure reset process:</p>
        <h3>How It Works:</h3>
        <ol>
          <li>Enter registered email</li>
          <li>Receive unique reset link</li>
          <li>Link expires after 1 hour</li>
          <li>Create new password</li>
        </ol>
        <h3>Security Features:</h3>
        <ul>
          <li>One-time use links</li>
          <li>Time-limited access</li>
          <li>Email verification</li>
        </ul>
      `,
      tags: ['password', 'recovery', 'security', 'reset'],
      readTime: '3 min'
    },
    {
      id: 98,
      category: 'Privacy & Security',
      title: 'Account activity monitoring',
      description: 'Track suspicious activity',
      content: `
        <h2>Activity Monitoring</h2>
        <p>Keep your account secure:</p>
        <h3>What to Monitor:</h3>
        <ul>
          <li>Login history</li>
          <li>Unusual activity</li>
          <li>Unknown downloads</li>
          <li>Profile changes</li>
        </ul>
        <h3>If Something Looks Wrong:</h3>
        <ul>
          <li>Change password immediately</li>
          <li>Review recent activity</li>
          <li>Contact support</li>
          <li>Enable additional security</li>
        </ul>
      `,
      tags: ['monitoring', 'activity', 'security', 'tracking'],
      readTime: '3 min'
    },
    {
      id: 99,
      category: 'Privacy & Security',
      title: 'Privacy policy updates',
      description: 'Staying informed about policy changes',
      content: `
        <h2>Policy Updates</h2>
        <p>How we communicate changes:</p>
        <h3>Notification Methods:</h3>
        <ul>
          <li>Email notifications</li>
          <li>Website announcements</li>
          <li>Dashboard alerts</li>
        </ul>
        <h3>What Changes Mean:</h3>
        <p>Continued use constitutes acceptance of updated policies.</p>
        <h3>Your Rights:</h3>
        <p>You can delete your account if you disagree with changes.</p>
      `,
      tags: ['privacy policy', 'updates', 'changes', 'notifications'],
      readTime: '2 min'
    },
    {
      id: 100,
      category: 'Privacy & Security',
      title: 'Encryption explained',
      description: 'Understanding data encryption',
      content: `
        <h2>Data Encryption</h2>
        <p>How we protect your data:</p>
        <h3>What is Encryption?</h3>
        <p>Encryption scrambles data so only authorized parties can read it.</p>
        <h3>What We Encrypt:</h3>
        <ul>
          <li>Passwords (never stored in plain text)</li>
          <li>Login sessions</li>
          <li>Data in transit (HTTPS)</li>
        </ul>
        <h3>Benefits:</h3>
        <ul>
          <li>Protects against eavesdropping</li>
          <li>Secures sensitive data</li>
          <li>Industry standard protection</li>
        </ul>
      `,
      tags: ['encryption', 'security', 'data', 'protection'],
      readTime: '3 min'
    },
    {
      id: 101,
      category: 'Privacy & Security',
      title: 'Compliance and certifications',
      description: 'Standards we follow',
      content: `
        <h2>Security Standards</h2>
        <p>Vantalog follows industry best practices:</p>
        <h3>Compliance:</h3>
        <ul>
          <li>GDPR (data protection)</li>
          <li>COPPA (children's privacy)</li>
          <li>Web security standards</li>
        </ul>
        <h3>Security Measures:</h3>
        <ul>
          <li>Regular security audits</li>
          <li>Encrypted connections</li>
          <li>Secure authentication</li>
          <li>Data protection protocols</li>
        </ul>
        <h3>Continuous Improvement:</h3>
        <p>We regularly update our security measures to protect you.</p>
      `,
      tags: ['compliance', 'certifications', 'standards', 'security'],
      readTime: '3 min'
    },
    {
      id: 102,
      category: 'Getting Started',
      title: 'Understanding email confirmation animations',
      description: 'What happens after submitting forms',
      content: `
        <h2>Email Confirmation Animations</h2>
        <p>After submitting important forms on Vantalog, you'll see a beautiful confirmation animation.</p>
        <h3>When You'll See This Animation:</h3>
        <ul>
          <li>After submitting the Contact form</li>
          <li>After requesting a password reset</li>
          <li>After submitting an admin access request</li>
        </ul>
        <h3>What the Animation Shows:</h3>
        <ul>
          <li><strong>Purple Gradient Background:</strong> Deep purple (900-800) full-screen overlay</li>
          <li><strong>Falling Confetti:</strong> 30 colorful particles (purple, violet, amber) falling from top</li>
          <li><strong>Animated Grid:</strong> Subtle background grid pattern for depth</li>
          <li><strong>Drawing Circle:</strong> SVG circle draws itself around the checkmark</li>
          <li><strong>Drawing Checkmark:</strong> Checkmark appears and draws inside the circle</li>
          <li><strong>Success Message:</strong> White card with "Success!" message fades in</li>
          <li><strong>Bouncing Dots:</strong> Three purple dots bounce to show processing</li>
          <li><strong>Corner Decorations:</strong> Curved purple shapes animate into corners</li>
        </ul>
        <h3>Animation Timeline:</h3>
        <ol>
          <li><strong>0.0s:</strong> Full-screen purple backdrop fades in</li>
          <li><strong>0.1s:</strong> White card springs into view with bounce effect</li>
          <li><strong>0-0.8s:</strong> Circle outline draws smoothly</li>
          <li><strong>0.8-1.3s:</strong> Checkmark draws inside circle</li>
          <li><strong>1.2s:</strong> "Success!" text fades up</li>
          <li><strong>1.5-1.6s:</strong> Corner decorations spring into place</li>
          <li><strong>15s:</strong> Automatic redirect (you'll see countdown)</li>
        </ol>
        <h3>What It Means:</h3>
        <ul>
          <li>Your form was submitted successfully</li>
          <li>An email has been sent to your inbox</li>
          <li>The system is processing your request</li>
          <li>You'll be redirected automatically</li>
        </ul>
        <h3>Next Steps:</h3>
        <ul>
          <li>Check your email inbox (and spam folder)</li>
          <li>Wait for the confirmation email (5-10 minutes)</li>
          <li>Follow any instructions in the email</li>
          <li>You'll be redirected automatically after 15 seconds</li>
        </ul>
      `,
      tags: ['animation', 'confirmation', 'email', 'success', 'forms', 'visual'],
      readTime: '4 min'
    },
    {
      id: 103,
      category: 'Account Management',
      title: 'How to get your admin account approved',
      description: 'What happens after requesting admin access',
      content: `
        <h2>Admin Account Approval Process</h2>
        <p>After submitting your admin request, here's what happens next:</p>
        <h3>Immediate Steps:</h3>
        <ol>
          <li>You see the success confirmation animation</li>
          <li>Your request is sent via email to lmno1432@gmail.com</li>
          <li>You receive a confirmation email to your inbox</li>
          <li>Your request enters the review queue</li>
        </ol>
        <h3>Review Process:</h3>
        <ul>
          <li><strong>Review Time:</strong> 24-48 hours typically</li>
          <li><strong>Reviewed By:</strong> Vantalog admin team</li>
          <li><strong>Evaluation Criteria:</strong></li>
          <ul>
            <li>Email legitimacy (not temporary/disposable)</li>
            <li>Account information completeness</li>
            <li>Display name professionalism</li>
            <li>Overall application quality</li>
          </ul>
        </ul>
        <h3>Possible Outcomes:</h3>
        <h4>If Approved:</h4>
        <ul>
          <li>You receive an approval email</li>
          <li>Your account is activated for admin access</li>
          <li>You can log in using Admin Access tab</li>
          <li>Full admin features become available</li>
        </ul>
        <h4>If Additional Information Needed:</h4>
        <ul>
          <li>Admin team contacts you via email</li>
          <li>You're asked to provide more details</li>
          <li>Your application is held pending response</li>
        </ul>
        <h4>If Denied:</h4>
        <ul>
          <li>You receive a denial email with reasons</li>
          <li>You can reapply after addressing issues</li>
          <li>Feedback provided for improvement</li>
        </ul>
        <h3>After Approval - First Login:</h3>
        <ol>
          <li>Go to Vantalog Login page</li>
          <li>Select "Admin Access" tab</li>
          <li>Enter your email and password</li>
          <li>Complete security verification</li>
          <li>Access your Admin Dashboard</li>
        </ol>
        <h3>Tips for Faster Approval:</h3>
        <ul>
          <li>Use a professional, permanent email address</li>
          <li>Complete all fields accurately</li>
          <li>Respond promptly if contacted</li>
          <li>Check spam folder for approval email</li>
        </ul>
      `,
      tags: ['admin', 'approval', 'account', 'request', 'access', 'privileges'],
      readTime: '5 min'
    },
    {
      id: 104,
      category: 'Technical Support',
      title: 'Using the Contact form effectively',
      description: 'Best practices for contacting support',
      content: `
        <h2>How to Use the Contact Form</h2>
        <p>Get the best support by using the Contact form correctly:</p>
        <h3>Accessing the Contact Form:</h3>
        <ol>
          <li>Visit the Vantalog public website</li>
          <li>Click "Contact" in the navigation menu</li>
          <li>You'll see the contact form on the Contact page</li>
        </ol>
        <h3>Form Fields Explained:</h3>
        <ul>
          <li><strong>Your Name:</strong> Enter your full name (required)</li>
          <li><strong>Email Address:</strong> Where we'll send our reply (required)</li>
          <li><strong>Subject:</strong> Brief summary of your inquiry (required)</li>
          <li><strong>Message:</strong> Detailed description (required, 20+ characters)</li>
        </ul>
        <h3>Writing an Effective Message:</h3>
        <h4>For Technical Issues:</h4>
        <ul>
          <li>Describe what you were trying to do</li>
          <li>Explain what happened instead</li>
          <li>Include any error messages (exact text)</li>
          <li>Mention your browser and device</li>
          <li>Note when the issue started</li>
        </ul>
        <h4>For Account Questions:</h4>
        <ul>
          <li>Include your account email</li>
          <li>Specify account type (User/Admin)</li>
          <li>Describe your specific question</li>
          <li>Mention any relevant dates or actions</li>
        </ul>
        <h4>For Feature Requests:</h4>
        <ul>
          <li>Explain what you'd like to see</li>
          <li>Describe how it would help you</li>
          <li>Provide examples if applicable</li>
        </ul>
        <h3>After Submitting:</h3>
        <ol>
          <li>Click "Send Message" button</li>
          <li>Wait for the confirmation animation</li>
          <li>Purple gradient screen with falling confetti appears</li>
          <li>Circle draws, then checkmark appears</li>
          <li>"Success!" message confirms submission</li>
          <li>Email is sent to lmno1432@gmail.com</li>
          <li>You receive a confirmation email</li>
          <li>Automatic redirect after 15 seconds</li>
        </ol>
        <h3>What to Expect:</h3>
        <ul>
          <li><strong>Confirmation Email:</strong> Arrives within 5-10 minutes</li>
          <li><strong>Initial Response:</strong> Within 24 hours</li>
          <li><strong>Full Resolution:</strong> 24-48 hours for most issues</li>
        </ul>
        <h3>Tips for Better Support:</h3>
        <ul>
          <li>Be specific and detailed</li>
          <li>Use a clear, descriptive subject</li>
          <li>Provide all relevant information upfront</li>
          <li>Check Help Center first for instant answers</li>
          <li>Be patient - good support takes time</li>
        </ul>
      `,
      tags: ['contact', 'form', 'support', 'help', 'email', 'message'],
      readTime: '5 min'
    },
    {
      id: 105,
      category: 'Technical Support',
      title: 'Troubleshooting login issues',
      description: 'Fix problems signing into your account',
      content: `
        <h2>Login Troubleshooting Guide</h2>
        <p>Having trouble logging in? Here's how to fix common issues:</p>
        <h3>Common Login Problems:</h3>
        <h4>1. "Invalid email or password" Error:</h4>
        <ul>
          <li>Verify you're using the correct email address</li>
          <li>Check caps lock is OFF</li>
          <li>Make sure you're on the right tab (User vs Admin)</li>
          <li>Try using the "Show password" toggle to verify</li>
          <li>Use "Forgot password?" to reset if needed</li>
        </ul>
        <h4>2. Security Verification Not Working:</h4>
        <ul>
          <li>Check the "I'm not a robot" checkbox first</li>
          <li>Wait for the security code to appear</li>
          <li>Enter the 6-digit code exactly as shown</li>
          <li>Don't include spaces or dashes</li>
          <li>Try clicking the refresh button if code doesn't appear</li>
        </ul>
        <h4>3. Account Not Found:</h4>
        <ul>
          <li>Verify you created an account with that email</li>
          <li>Check if you're using the correct account type</li>
          <li>Admin accounts must be approved first</li>
          <li>Try searching your email for Vantalog confirmation</li>
        </ul>
        <h4>4. Page Won't Load:</h4>
        <ul>
          <li>Check your internet connection</li>
          <li>Try refreshing the page</li>
          <li>Clear browser cache and cookies</li>
          <li>Try a different browser</li>
          <li>Disable browser extensions temporarily</li>
        </ul>
        <h3>Step-by-Step Login Process:</h3>
        <ol>
          <li>Go to Vantalog Login page</li>
          <li>Select correct tab (User Access or Admin Access)</li>
          <li>Enter your registered email</li>
          <li>Enter your password</li>
          <li>Click "Sign In"</li>
          <li>On Authenticator page:</li>
          <ul>
            <li>Check "I'm not a robot"</li>
            <li>Wait for 6-digit code to appear</li>
            <li>Enter the code</li>
            <li>Click "Verify & Continue"</li>
          </ul>
          <li>Wait for redirect animation (rotating book)</li>
          <li>Access your dashboard</li>
        </ol>
        <h3>If Still Having Issues:</h3>
        <ul>
          <li>Try the "Forgot password?" feature</li>
          <li>Check your email spam folder</li>
          <li>Contact support via Contact form</li>
          <li>Include: email, browser, error messages</li>
        </ul>
      `,
      tags: ['login', 'troubleshooting', 'issues', 'problems', 'access', 'sign in'],
      readTime: '5 min'
    },
    {
      id: 106,
      category: 'Finding Resources',
      title: 'How to submit feedback on resources',
      description: 'Share your thoughts to help improve content',
      content: `
        <h2>Submitting Resource Feedback</h2>
        <p>Help improve Vantalog by sharing your feedback on resources:</p>
        <h3>Why Feedback Matters:</h3>
        <ul>
          <li>Helps identify quality resources</li>
          <li>Guides content improvement</li>
          <li>Assists other users in finding best materials</li>
          <li>Informs admin team about issues</li>
        </ul>
        <h3>How to Submit Feedback:</h3>
        <ol>
          <li>Browse to a resource you've used</li>
          <li>Look for the feedback or rating section</li>
          <li>Click on the feedback button</li>
          <li>Choose your rating (if applicable)</li>
          <li>Write your detailed feedback</li>
          <li>Click "Submit Feedback"</li>
        </ol>
        <h3>What Makes Good Feedback:</h3>
        <h4>Be Specific:</h4>
        <ul>
          <li>Mention particular aspects that worked/didn't work</li>
          <li>Reference specific pages or sections</li>
          <li>Explain the context of your use</li>
        </ul>
        <h4>Be Constructive:</h4>
        <ul>
          <li>Suggest improvements, not just criticisms</li>
          <li>Explain what would make it better</li>
          <li>Balance positive and negative points</li>
        </ul>
        <h4>Be Helpful:</h4>
        <ul>
          <li>Think about other users reading your feedback</li>
          <li>Mention your skill level/background</li>
          <li>Note any prerequisites needed</li>
        </ul>
        <h3>Types of Feedback:</h3>
        <ul>
          <li><strong>Quality Issues:</strong> Errors, outdated info, unclear content</li>
          <li><strong>Technical Issues:</strong> Download problems, format issues</li>
          <li><strong>Content Suggestions:</strong> Topics to add or expand</li>
          <li><strong>Positive Reviews:</strong> What worked well</li>
        </ul>
        <h3>Admins Review Your Feedback:</h3>
        <ul>
          <li>All feedback goes to admin team</li>
          <li>Used to improve existing resources</li>
          <li>Guides future content creation</li>
          <li>Critical issues addressed promptly</li>
        </ul>
      `,
      tags: ['feedback', 'review', 'rating', 'comments', 'improvement'],
      readTime: '4 min'
    },
  ];

  // Combine all articles
  const allArticles = useMemo(() => {
    return [...helpArticles];
  }, []);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    let filtered = allArticles;

    if (selectedCategoryFilter !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategoryFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        article.content.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allArticles, searchQuery, selectedCategoryFilter]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(allArticles.map(a => a.category))];
    return cats.sort();
  }, [allArticles]);

  // Group articles by category
  const articlesByCategory = useMemo(() => {
    const grouped = {};
    filteredArticles.forEach(article => {
      if (!grouped[article.category]) {
        grouped[article.category] = [];
      }
      grouped[article.category].push(article);
    });
    return grouped;
  }, [filteredArticles]);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const openArticle = (article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  const handleFeedback = (articleId, helpful) => {
    setArticleFeedback(prev => ({
      ...prev,
      [articleId]: helpful
    }));
  };

  const quickLinks = [
    { icon: HelpCircle, text: 'Frequently Asked Questions', link: '/Vantalog/Support/FAQ' },
    { icon: MessageSquare, text: 'Contact Support', link: '/Vantalog/About/Contact' },
  ];

  const categoryIcons = {
    'Getting Started': Sparkles,
    'Finding Resources': Search,
    'Account Management': UserCircle,
    'Admin Features': Shield,
    'Technical Support': Wrench,
    'Privacy & Security': Lock
  };

  return (
    <PublicLayout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Professional Background with Purple Theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
          
          {/* Article Detail View */}
          <AnimatePresence>
            {selectedArticle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
                onClick={closeArticle}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="min-h-screen py-8 flex items-start justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-4xl w-full mx-4 overflow-hidden border border-purple-200/50"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25), inset 0 -1px 0 0 rgba(255,255,255,0.6), 0 1px 2px 0 rgba(0,0,0,0.05)'
                    }}>
                    {/* Article Header with Purple Theme */}
                    <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <button
                        onClick={closeArticle}
                        className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-300 group z-20"
                      >
                        <X className="size-5 group-hover:rotate-90 transition-transform duration-300" />
                      </button>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative z-10"
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-4">
                          {(() => {
                            const Icon = categoryIcons[selectedArticle.category] || FileText;
                            return <Icon className="size-3.5" />;
                          })()}
                          {selectedArticle.category}
                        </div>
                        <h1 className="text-3xl font-bold mb-3">{selectedArticle.title}</h1>
                        <div className="flex items-center gap-4 text-purple-100">
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-4" />
                            <span className="text-sm">{selectedArticle.readTime}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Article Content */}
                    <div className="p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg max-w-none help-article-content"
                        dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                      />

                      {/* Feedback Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 pt-8 border-t border-gray-200"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Was this article helpful?</h3>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleFeedback(selectedArticle.id, true)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                              articleFeedback[selectedArticle.id] === true
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <ThumbsUp className="size-5" />
                            Yes
                          </button>
                          <button
                            onClick={() => handleFeedback(selectedArticle.id, false)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                              articleFeedback[selectedArticle.id] === false
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <ThumbsDown className="size-5" />
                            No
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Help Center Content */}
          {!selectedArticle && (
            <>
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl mb-6 shadow-xl shadow-purple-600/30"
                >
                  <HelpCircle className="size-10 text-white" />
                </motion.div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  How can we help you?
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Search our knowledge base of 100 articles or browse by category
                </p>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-3xl mx-auto mb-12"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl opacity-0 group-focus-within:opacity-20 blur-xl transition-all"></div>
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search for help articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-16 pr-6 py-5 bg-white border-2 border-gray-200 rounded-2xl text-lg focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all shadow-lg"
                    />
                  </div>
                </div>
                {searchQuery && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-gray-600"
                  >
                    Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                  </motion.p>
                )}
              </motion.div>

              {/* View Mode Selector & Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-between gap-4 mb-8"
              >
                {/* View Mode */}
                <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-md border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      viewMode === 'grid'
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid3x3 className="size-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('category')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      viewMode === 'category'
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Layers className="size-4" />
                    Categories
                  </button>
                  <button
                    onClick={() => setViewMode('all')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      viewMode === 'all'
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List className="size-4" />
                    List
                  </button>
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-700 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all shadow-md"
                >
                  <option value="all">All Categories ({allArticles.length} articles)</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </motion.div>

              {/* Grid View */}
              {viewMode === 'grid' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                >
                  {filteredArticles.map((article, index) => {
                    const Icon = categoryIcons[article.category] || FileText;
                    return (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => openArticle(article)}
                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-200 hover:border-purple-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-800 transition-all">
                            <Icon className="size-6 text-purple-600 group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-purple-600 mb-1">{article.category}</div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{article.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {article.readTime}
                          </span>
                          <ChevronRight className="size-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Category View */}
              {viewMode === 'category' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 mb-16"
                >
                  {Object.entries(articlesByCategory).map(([category, articles], catIndex) => {
                    const Icon = categoryIcons[category] || FileText;
                    const isExpanded = expandedCategory === category;
                    
                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                              <Icon className="size-6 text-purple-600" />
                            </div>
                            <div className="text-left">
                              <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                              <p className="text-sm text-gray-600">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="size-6 text-gray-400" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-200"
                            >
                              <div className="p-4 space-y-2">
                                {articles.map((article, index) => (
                                  <motion.button
                                    key={article.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => openArticle(article)}
                                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-all group text-left"
                                  >
                                    <div className="flex-1">
                                      <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                                        {article.title}
                                      </h4>
                                      <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                      <span className="text-xs text-gray-500">{article.readTime}</span>
                                      <ChevronRight className="size-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* List View */}
              {viewMode === 'all' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-16"
                >
                  <div className="divide-y divide-gray-200">
                    {filteredArticles.map((article, index) => {
                      const Icon = categoryIcons[article.category] || FileText;
                      return (
                        <motion.button
                          key={article.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => openArticle(article)}
                          className="w-full flex items-center gap-4 p-6 hover:bg-purple-50 transition-all group text-left"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-800 transition-all flex-shrink-0">
                            <Icon className="size-6 text-purple-600 group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-purple-600 mb-1">{article.category}</div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{article.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">{article.readTime}</span>
                            <ChevronRight className="size-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* No Results */}
              {filteredArticles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="size-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search or browse all categories</p>
                </motion.div>
              )}

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need More Help?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {quickLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="group flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-purple-300 transition-all"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-800 transition-all">
                        <link.icon className="size-7 text-purple-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {link.text}
                        </h3>
                      </div>
                      <ChevronRight className="size-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
