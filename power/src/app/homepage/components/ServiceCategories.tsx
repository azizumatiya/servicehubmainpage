"use client";

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const API_BASE_URL = "http://127.0.0.1:5000/api";

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  providerCount: number;
  averagePrice: string;
}

interface ServiceCategoriesProps {
  onCategoryClick: (category: ServiceCategory) => void;
}

const ServiceCategories = ({ onCategoryClick }: ServiceCategoriesProps) => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: ServiceCategory[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading categories...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Popular Service Categories
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Browse our most requested services with verified professionals ready to help
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category)}
              className="card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon 
                  name={category.icon as any} 
                  size={32} 
                  className="text-primary group-hover:text-primary/80" 
                />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {category.description}
              </p>
              
              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Providers:</span>
                  <span className="font-medium text-foreground">{category.providerCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Starting at:</span>
                  <span className="font-medium text-primary">{category.averagePrice}</span>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-end mt-4">
                <Icon 
                  name="ArrowRightIcon" 
                  size={20} 
                  className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;