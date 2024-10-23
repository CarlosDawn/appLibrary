import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={'black'} />
          ),
        }}
      />
      <Tabs.Screen
        name="searchBook"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={'black'} />
          ),
        }}
      />
      <Tabs.Screen
        name="registerBook"
        options={{
          title: 'Register',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={'black'} />
          ),
        }}
      />
      <Tabs.Screen
        name="emprestados"
        options={{
          title: 'EMPRESTIMOS',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bookmarks' : 'bookmark-outline'} color={'black'} />
          ),
        }}
      />
      
    </Tabs>
  );
}
