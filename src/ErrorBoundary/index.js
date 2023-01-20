import React, { Component } from 'react'
import './styles.css';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error){
        console.log('executed');
        console.log(error);
        return {
            hasError : true
        }
    }
    render() {
        if (this.state.hasError) {
            return (
                <div id='errorBoundaryPage'>
                    <h1 id='errorBoundaryPageHeading'>Something went wrong</h1>
                    <p>Thanks for noticing - we're going to fix it up and have things back to normal soon.</p>
                </div>
            )
        }
        return this.props.children;

    }
}
