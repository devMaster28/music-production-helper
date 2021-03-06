import Vex from 'vexflow';

import React, {Component} from 'react';

const {
    Accidental,
    Formatter,
    Stave,
    StaveNote,
    Renderer,
} = Vex.Flow;

export default class Note extends Component {
    render() {
        return <div ref={"outer"} style={{
            width:300,
            padding: 10,
            borderRadius: 10,
            backgroundColor:this.props.selected? '#5bc0de':'',
            display: "inline-block",
        }}>
        </div>;
    }
    componentDidUpdate() {
        const parent = this.refs["outer"]
        if ( parent){
            while (parent.firstChild) {
                parent.firstChild.remove()
            }
        }
        const {chord} = this.props;
        console.log("chord ",chord)

        const svgContainer = document.createElement('div');
        const renderer = new Renderer(svgContainer, Renderer.Backends.SVG);
        const ctx = renderer.getContext();
        const stave = new Stave(0, 0, 300);  // x, y, width
        stave.addClef('treble').setContext(ctx).draw();
        const bb = Formatter.FormatAndDraw(ctx, stave, chord);

        const svg = svgContainer.childNodes[0];
        const padding = 10;
        const half = padding / 2;
        svg.style.top = -bb.y + half + Math.max(0, (100 - bb.h) * 2/3) + "px";
        svg.style.height = Math.max(100, bb.h);
        svg.style.left = "0px";
        svg.style.width = 300 + "px";
        svg.style.position = "absolute";
        svg.style.overflow = "visible";
        svgContainer.style.height = Math.max(100, bb.h + padding) + "px";
        svgContainer.style.width = 100 + "px";
        svgContainer.style.position = "relative";
        svgContainer.style.display = "inlineBlock";

        this.refs["outer"].appendChild(svgContainer);
    }
}