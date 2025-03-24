import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SammlungCardDemo } from '@/components/sammlung/SammlungCardDemo';
import { Container } from '@/components/ui';

export default function SammlungCardDemoScreen() {
  return (
    <Container>
      <SammlungCardDemo />
    </Container>
  );
}
