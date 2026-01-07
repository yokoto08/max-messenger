import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SQLiteProvider } from 'expo-sqlite';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { DatabaseService } from '@/src/services/DatabaseService';

SplashScreen.preventAutoHideAsync();

function AppContent() {

    useEffect(() => {
        SplashScreen.hideAsync();
        console.log('👀 Заставка скрыта, показываем экраны');
    }, []);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
    );
}

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SQLiteProvider
                databaseName="dictionary.db"
                onInit={DatabaseService.init}
                useSuspense
            >
                <AppContent />
            </SQLiteProvider>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}