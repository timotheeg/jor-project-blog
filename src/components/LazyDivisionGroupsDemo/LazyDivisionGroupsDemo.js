'use client';
import React from 'react';
import Spinner from '@/components/Spinner'

import dynamic from 'next/dynamic';

const DivisionGroupsDemo = dynamic(() => import('/src/components/DivisionGroupsDemo/DivisionGroupsDemo'));

function LazyDivisionGroupsDemo({...props}) {
  return <React.Suspense fallback={Spinner}>
    <DivisionGroupsDemo {...props} />
  </React.Suspense>
}

export default LazyDivisionGroupsDemo;
