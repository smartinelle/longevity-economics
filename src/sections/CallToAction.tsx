'use client'

import React, { useState } from 'react';
import ArrowRight from '@/assets/arrow-right.svg';
import starImage from '@/assets/star.png';
import springImage from '@/assets/spring.png';
import Image from 'next/image';
import { Mail } from 'lucide-react';

export const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      if (data.success) {
        setStatus('Thanks for subscribing!');
        setEmail('');
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus(err.message || 'Error subscribing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip">
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">
            Stay updated on our progress
          </h2>
          <p className="section-description mt-5">
            Join our community to receive updates on our latest research and innovations in longevity economics.
          </p>
          <Image 
            src={starImage}
            alt="Star Image"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
          />
          <Image 
            src={springImage}
            alt="Spring Image" 
            width={360} 
            className="absolute -right-[331px] -top-[19px]"
          />
        </div>
        
        <div className="mt-10 max-w-[450px] mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex items-center justify-center gap-2 min-w-[140px]"
            >
              {loading ? (
                'Subscribing...'
              ) : (
                <>
                  Subscribe
                  <Mail className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
          
          {status && (
            <div className={`mt-4 text-center ${
              status.includes('Error') ? 'text-red-500' : 'text-green-600'
            }`}>
              {status}
            </div>
          )}
        
        </div>
      </div>
    </section>
  );
};

export default CallToAction;