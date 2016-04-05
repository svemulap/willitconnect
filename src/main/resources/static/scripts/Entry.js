import React from 'react';

var Entry = React.createClass({
    getInitialState: function () {
        return {status: []};
    },

    getData: function() {
        return JSON.stringify({"target": this.props.host+":"+this.props.port});
    },

    componentWillMount: function () {

        var path = '/v2/willitconnect';

        jQuery.ajax ({
            url: path,
            type: "POST",
            data: this.getData(),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.setState({status: data});
            }.bind(this)
        });
    },
    render: function () {
        var connectionStyle = {color: 'blue'};
        if(Object.keys(this.state.status).length) {
            console.log(this.state.status);
            connectionStyle = this.state.status.canConnect ? {color: 'green'} : {color: 'red'};
        }

        return (
            <div style={ connectionStyle }>
                <h3 className="entry">
                    {this.props.host} : {this.props.port}
                </h3>
            </div>
        );
    }
});

module.exports = Entry;