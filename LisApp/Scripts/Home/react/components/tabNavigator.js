import React, { Component } from 'react';
import { Trans } from 'react-i18next';

class TabNavigator extends Component {

    render() {
        const { tabs, selectedTab } = this.props;

        return (
            <div className="div-tabs">
                {tabs.map((t) => <div key={t.index} className={(t.index === selectedTab ? "selected-tab" : "not-selected-tab") + " all-tab"}><Trans>{t.name}</Trans></div>)}
            </div>
        );
    }
}

export default TabNavigator;