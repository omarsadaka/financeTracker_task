import { Alert } from 'react-native'
import { IApp } from '../models'
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: IApp = {
    lang: 'en',
    showOnbarding: true,
  }

const AppSlice = createSlice({
    name: "App",
    initialState,
    reducers: {
      setShowOnbarding: (state, action) => {
        state.showOnbarding = action.payload;
      },
      SaveLang(state, action: PayloadAction<'en' | 'ar'>) {
        state.lang = action.payload
      },
    }
  })

export const { SaveLang , setShowOnbarding} = AppSlice.actions
export default AppSlice