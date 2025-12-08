import React from 'react';
import { motion } from 'framer-motion';
import { 
    Shield, 
    Clock, 
    TrendingUp, 
    Users,
    FileBarChart,
    Settings,
    Bell,
    CheckCircle
} from 'lucide-react';
import FeaturesCard from '../components/common/FeaturesCard';

const Features = () => {
    const features = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Secure Platform",
            description: "End-to-end encrypted with role-based permissions"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Time Saving",
            description: "Reduce asset management time by 70%"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "ROI Focused",
            description: "Proven cost reduction through better asset utilization"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Team Oriented",
            description: "Designed for HR-employee collaboration"
        },
        {
            icon: <FileBarChart className="w-8 h-8" />,
            title: "Real-time Analytics",
            description: "Data-driven insights for strategic decisions"
        },
        {
            icon: <Settings className="w-8 h-8" />,
            title: "Easy Integration",
            description: "Connect with existing HR and finance systems"
        }
    ];

    return (
        <section className="py-20 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Why AssetVerse Stands Out</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Built with enterprise requirements in mind</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map(({ icon, title, description }, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                        >
                            <div className="flex items-start space-x-4">
                                <FeaturesCard icon={icon} title={title} description={description} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Feature Highlights Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0 md:mr-8">
                            <h3 className="text-2xl font-bold mb-2">Ready to experience the difference?</h3>
                            <p className="text-blue-100">Join thousands of companies who trust AssetVerse</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span>Free 30-day trial</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span>Full support included</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;