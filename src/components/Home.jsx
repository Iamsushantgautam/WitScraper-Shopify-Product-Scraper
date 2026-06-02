import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Simulator from './Simulator';
import PromptsCarousel from './PromptsCarousel';
import ShopifyAppsCarousel from './ShopifyAppsCarousel';
import InstallGuide from './InstallGuide';
import CreatorSpotlight from './CreatorSpotlight';

function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Simulator />
      <PromptsCarousel />
      <ShopifyAppsCarousel />
      <InstallGuide />
      <CreatorSpotlight />
    </main>
  );
}

export default Home;
