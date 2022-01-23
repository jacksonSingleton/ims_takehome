import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('check to ensure app is rendering', () => {
   render(<App />);
   expect(screen.getByText('SEISMA')).toBeInTheDocument();
});

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(),
  Marker: jest.fn().mockReturnValue({
    setLngLat: jest.fn().mockReturnValue({
      setPopup: jest.fn().mockReturnValue({
        addTo: jest.fn().mockReturnValue({})
      })
    })
  }),
  Popup: jest.fn().mockReturnValue({
    setHTML: jest.fn().mockReturnValue({ on: jest.fn() })
  })
}))
