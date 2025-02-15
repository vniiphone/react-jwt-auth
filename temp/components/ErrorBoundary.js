

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.log(error, info);
    }

    render() {
        if (this.state.hasError)
        {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

<ErrorBoundary>
    <App />
</ErrorBoundary>
