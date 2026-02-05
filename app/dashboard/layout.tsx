import React from 'react'
import DashboardProvider from './Provider'

const DashboardLayout = ({ children }: any) => {
    return (
        <div>
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </div>
    )
}

export default DashboardLayout
