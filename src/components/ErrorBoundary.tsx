import {captureException, showReportDialog, withScope} from '@sentry/browser'
import React from 'react'

export class ErrorBoundary extends React.Component {
  public state = {error: null}

  public componentDidCatch(error: any, errorInfo: any) {
    this.setState({error})
    withScope((scope: any) => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      captureException(error)
    })
  }

  public render() {
    if (this.state.error) {
      return (
        <div>
          <p>We're sorry - something's gone wrong.</p>
          <p>
            Our team has been notified, but click{' '}
            <button
              onClick={() =>
                showReportDialog({
                  dsn: process.env.REACT_APP_ERROR_REPORTING_KEY,
                })
              }
            >
              here
            </button>{' '}
            to fill out a report.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
