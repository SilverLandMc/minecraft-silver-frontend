import { StoryFn } from '@storybook/react';
import { AppContextProvider } from 'app/providers/AppContextProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { MediaContextProvider } from 'app/providers/MediaProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import combineProviders from 'shared/lib/combineProviders/combineProviders';

const AppContainer = combineProviders(
    BrowserRouter,
    StoreProvider,
    ThemeProvider,
    MediaContextProvider,
    AppContextProvider,
    ErrorBoundary
);

export const AppContainerDecorator = (StoryComponent: StoryFn) => (
    <div className="app">
        <AppContainer>
            <StoryComponent />
        </AppContainer>
    </div>
);
