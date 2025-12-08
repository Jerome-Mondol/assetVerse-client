import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Hero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="bg-white pt-20 pb-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ ...fadeInUp.transition, delay: 0.05 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Enterprise Asset Management
            </h1>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ ...fadeInUp.transition, delay: 0.09 }}
            className="mb-10"
          >
            <p className="text-2xl md:text-3xl text-blue-600 font-medium">
              Simplified for Modern HR Teams
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ ...fadeInUp.transition, delay: 0.13 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A comprehensive platform for tracking, assigning, and managing 
              corporate assets with efficiency and precision.
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ ...fadeInUp.transition, delay: 0.17    }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/join-as-hr-manager"
              className="px-8 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              Get Started
            </Link>
            <Link
              to="/learn"
              className="px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;