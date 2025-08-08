import React, { useState } from 'react';
import { Search, Youtube, TrendingUp, Users, Eye, Heart, MessageCircle, Clock, BarChart3, Loader2, AlertCircle } from 'lucide-react';

interface ChannelData {
  channelName: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  averageViews: number;
  engagementRate: number;
  uploadFrequency: string;
  topVideos: Array<{
    title: string;
    views: number;
    likes: number;
    comments: number;
    publishedAt: string;
  }>;
  categoryBreakdown: Array<{
    category: string;
    percentage: number;
  }>;
  growthTrend: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<ChannelData | null>(null);

  const defaultChannels = [
    { name: 'Tech Channel', url: 'https://www.youtube.com/@TechChannel' },
    { name: 'Cooking Master', url: 'https://www.youtube.com/@CookingMaster' },
    { name: 'Travel Vlogger', url: 'https://www.youtube.com/@TravelVlogger' },
    { name: 'Gaming Pro', url: 'https://www.youtube.com/@GamingPro' }
  ];

  const validateYouTubeURL = (url: string): boolean => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/channel\/[a-zA-Z0-9_-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/c\/[a-zA-Z0-9_-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/user\/[a-zA-Z0-9_-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/@[a-zA-Z0-9_-]+/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const fetchChannelData = async (channelUrl: string): Promise<ChannelData> => {
    // Simulate API call - replace with actual APIFY API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate different mock data based on channel URL
    const channelVariations = {
      'TechChannel': {
        channelName: "TechChannel",
        subscriberCount: 125000,
        videoCount: 89,
        viewCount: 2500000,
        averageViews: 28000,
        engagementRate: 4.2,
        uploadFrequency: "2-3 times per week",
        topVideos: [
          { title: "How to Build Amazing Web Apps", views: 85000, likes: 3200, comments: 180, publishedAt: "2024-01-15" },
          { title: "React Best Practices Guide", views: 62000, likes: 2800, comments: 145, publishedAt: "2024-01-10" },
          { title: "JavaScript Performance Tips", views: 41000, likes: 1900, comments: 95, publishedAt: "2024-01-05" }
        ],
        categoryBreakdown: [
          { category: "Tutorials", percentage: 45 },
          { category: "Reviews", percentage: 30 },
          { category: "Live Streams", percentage: 15 },
          { category: "Shorts", percentage: 10 }
        ],
        growthTrend: "Growing"
      },
      'CookingMaster': {
        channelName: "Cooking Master",
        subscriberCount: 89000,
        videoCount: 156,
        viewCount: 1800000,
        averageViews: 11500,
        engagementRate: 6.8,
        uploadFrequency: "Daily",
        topVideos: [
          { title: "Perfect Pasta in 15 Minutes", views: 120000, likes: 5400, comments: 320, publishedAt: "2024-01-20" },
          { title: "Homemade Pizza Secrets", views: 95000, likes: 4200, comments: 280, publishedAt: "2024-01-18" },
          { title: "Dessert Masterclass", views: 78000, likes: 3600, comments: 195, publishedAt: "2024-01-16" }
        ],
        categoryBreakdown: [
          { category: "Recipes", percentage: 60 },
          { category: "Tips & Tricks", percentage: 25 },
          { category: "Reviews", percentage: 10 },
          { category: "Live Cooking", percentage: 5 }
        ],
        growthTrend: "Growing"
      },
      'TravelVlogger': {
        channelName: "Travel Vlogger",
        subscriberCount: 67000,
        videoCount: 234,
        viewCount: 3200000,
        averageViews: 13700,
        engagementRate: 5.1,
        uploadFrequency: "Weekly",
        topVideos: [
          { title: "Hidden Gems of Tokyo", views: 156000, likes: 7200, comments: 450, publishedAt: "2024-01-22" },
          { title: "Budget Travel Guide: Europe", views: 134000, likes: 6100, comments: 380, publishedAt: "2024-01-19" },
          { title: "Solo Travel Safety Tips", views: 98000, likes: 4800, comments: 290, publishedAt: "2024-01-17" }
        ],
        categoryBreakdown: [
          { category: "Vlogs", percentage: 50 },
          { category: "Travel Guides", percentage: 30 },
          { category: "Culture", percentage: 15 },
          { category: "Food Tours", percentage: 5 }
        ],
        growthTrend: "Stable"
      },
      'GamingPro': {
        channelName: "Gaming Pro",
        subscriberCount: 245000,
        videoCount: 412,
        viewCount: 8900000,
        averageViews: 21600,
        engagementRate: 7.3,
        uploadFrequency: "Daily",
        topVideos: [
          { title: "Epic Boss Battle Compilation", views: 340000, likes: 18000, comments: 1200, publishedAt: "2024-01-25" },
          { title: "New Game Review: Must Play!", views: 280000, likes: 15000, comments: 980, publishedAt: "2024-01-23" },
          { title: "Pro Tips for Beginners", views: 195000, likes: 11000, comments: 650, publishedAt: "2024-01-21" }
        ],
        categoryBreakdown: [
          { category: "Gameplay", percentage: 40 },
          { category: "Reviews", percentage: 25 },
          { category: "Tutorials", percentage: 20 },
          { category: "Live Streams", percentage: 15 }
        ],
        growthTrend: "Growing"
      }
    };

    // Determine which mock data to use based on URL
    const channelKey = Object.keys(channelVariations).find(key => channelUrl.includes(key)) || 'TechChannel';
    return channelVariations[channelKey as keyof typeof channelVariations];
  };

  const handleDefaultChannel = (channelUrl: string) => {
    setUrl(channelUrl);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a YouTube channel URL');
      return;
    }

    if (!validateYouTubeURL(url)) {
      setError('Please enter a valid YouTube channel URL');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const channelData = await fetchChannelData(url);
      setData(channelData);
    } catch (err) {
      setError('Failed to fetch channel data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Youtube className="w-12 h-12 text-red-500 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              YouTube Analytics Explorer
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover insights about any YouTube channel with beautiful visualizations and comprehensive analytics
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a YouTube channel URL"
                className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                disabled={loading}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Fetching Insights...
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Fetch Insights
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl flex items-center text-red-400">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {/* Default Channel Buttons */}
          <div className="mt-8">
            <p className="text-center text-gray-400 mb-4">Or try these sample channels:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {defaultChannels.map((channel, index) => (
                <button
                  key={index}
                  onClick={() => handleDefaultChannel(channel.url)}
                  disabled={loading}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-lg text-gray-300 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {channel.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Dashboard */}
        {data && (
          <div className="space-y-8 animate-fade-in">
            {/* Channel Overview */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Youtube className="w-8 h-8 text-red-500 mr-3" />
                <h2 className="text-3xl font-bold text-white">{data.channelName}</h2>
                <span className={`ml-auto px-4 py-2 rounded-full text-sm font-medium ${
                  data.growthTrend === 'Growing' ? 'bg-green-500/20 text-green-400' : 
                  data.growthTrend === 'Stable' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-red-500/20 text-red-400'
                }`}>
                  {data.growthTrend}
                </span>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-xl border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl font-bold text-blue-400">{formatNumber(data.subscriberCount)}</span>
                  </div>
                  <p className="text-gray-300 text-sm">Subscribers</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 rounded-xl border border-purple-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-8 h-8 text-purple-400" />
                    <span className="text-2xl font-bold text-purple-400">{formatNumber(data.viewCount)}</span>
                  </div>
                  <p className="text-gray-300 text-sm">Total Views</p>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-xl border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <span className="text-2xl font-bold text-green-400">{data.engagementRate}%</span>
                  </div>
                  <p className="text-gray-300 text-sm">Engagement Rate</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-6 rounded-xl border border-orange-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-8 h-8 text-orange-400" />
                    <span className="text-2xl font-bold text-orange-400">{data.videoCount}</span>
                  </div>
                  <p className="text-gray-300 text-sm">Total Videos</p>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-2">Average Views per Video</h3>
                  <p className="text-3xl font-bold text-blue-400">{formatNumber(data.averageViews)}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Frequency</h3>
                  <p className="text-xl font-medium text-gray-300">{data.uploadFrequency}</p>
                </div>
              </div>
            </div>

            {/* Top Videos */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" />
                Top Performing Videos
              </h3>
              <div className="space-y-4">
                {data.topVideos.map((video, index) => (
                  <div key={index} className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-medium text-white flex-1 mr-4">{video.title}</h4>
                      <span className="text-sm text-gray-400">{formatDate(video.publishedAt)}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-blue-400 font-medium">{formatNumber(video.views)}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-red-400 font-medium">{formatNumber(video.likes)}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-green-400 font-medium">{video.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Categories */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3" />
                Content Categories
              </h3>
              <div className="space-y-4">
                {data.categoryBreakdown.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{category.category}</span>
                      <span className="text-gray-400">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                          index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          index === 1 ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                          index === 2 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                          'bg-gradient-to-r from-orange-500 to-orange-600'
                        }`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;