import React from 'react'
import { motion } from 'framer-motion'
import BenefitCard from '../components/common/BenefitCard';

const About = () => {

     const benefits = [
        {
            title: "Cost Reduction",
            description: "Eliminate asset loss and reduce replacement costs with complete tracking from assignment to return."
        },
        {
            title: "Improved Accountability",
            description: "Clear visibility into asset assignments ensures responsibility at every organizational level."
        },
        {
            title: "Streamlined Processes",
            description: "Automated workflows for asset requests, approvals, and returns minimize administrative burden."
        },
        {
            title: "Scalable Solutions",
            description: "Grow from managing 5 to 5000+ assets without changing platforms or processes."
        }
    ];

  return (
    <>
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4 ">Key Business Benefits</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto  ">Drive operational excellence and strategic advantage through comprehensive asset management</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {benefits.map(({ title, description }, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-lg border border-gray-200"
                        >
                            <div className="flex items-start space-x-4">
                                <BenefitCard title={title} description={description} index={index} />
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 bg-white rounded-xl p-8 border border-gray-200"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
                            <div className="text-gray-600 text-sm">Reduction in Asset Loss</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                            <div className="text-gray-600 text-sm">Faster Onboarding</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
                            <div className="text-gray-600 text-sm">Lower Admin Costs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                            <div className="text-gray-600 text-sm">Audit Compliance</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    </>
  )
}

export default About
