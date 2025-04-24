import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GitHubStats = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = 'hassaammgl'; // Replace with your username

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch data from GitHub API
                const response = await axios.get(`https://api.github.com/users/${username}`);
                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching GitHub API, falling back to readme stats", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, [username]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Couldn't load live GitHub data. Showing static stats instead.</p>
                <img
                    src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark`}
                    alt="GitHub Stats"
                    className="mx-auto"
                />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Section */}
                <div className="flex flex-col items-center md:w-1/3">
                    <img
                        src={userData.avatar_url}
                        alt={`${username}'s avatar`}
                        className="w-32 h-32 rounded-full border-4 border-blue-400 mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{userData.name || username}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">@{username}</p>
                    <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">{userData.bio || 'GitHub Developer'}</p>

                    <div className="flex space-x-4 mb-4">
                        <a
                            href={userData.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            View Profile
                        </a>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">GitHub Statistics</h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <StatCard
                            title="Public Repos"
                            value={userData.public_repos}
                            icon="📦"
                        />
                        <StatCard
                            title="Followers"
                            value={userData.followers}
                            icon="👥"
                        />
                        <StatCard
                            title="Following"
                            value={userData.following}
                            icon="👀"
                        />
                        <StatCard
                            title="Gists"
                            value={userData.public_gists}
                            icon="✏️"
                        />
                    </div>

                    {/* Additional GitHub Stats */}
                    <div className="space-y-4">
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-800 dark:text-white mb-2">Top Languages</h4>
                            <img
                                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark`}
                                alt="Top Languages"
                                className="w-full"
                            />
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-800 dark:text-white mb-2">Contribution Streak</h4>
                            <img
                                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark`}
                                alt="GitHub Streak"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }) => (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center">
            <span className="text-2xl mr-2">{icon}</span>
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
            </div>
        </div>
    </div>
);

export default GitHubStats;