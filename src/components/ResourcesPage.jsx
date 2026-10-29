import React from 'react';
import { ArrowRight, BarChart3, BookOpen, Clock3, ListTodo, Sparkles } from 'lucide-react';

const resources=[
 {title:'Focus basics',description:'Simple ways to start a study session when motivation is low.',time:'8 min read',icon:Sparkles,to:'/study-plan'},
 {title:'A gentler task list',description:'Turn a large assignment into steps you can finish.',time:'5 min read',icon:ListTodo,to:'/tasks'},
 {title:'Read your progress report',description:'What weekly trends can and cannot tell you.',time:'4 min read',icon:BarChart3,to:'/reports'},
 {title:'Make time for deep work',description:'A practical guide to shorter, more focused blocks.',time:'12 min read',icon:Clock3,to:'/study-plan'}
];
export default function ResourcesPage({go}){return <><div className="page-title"><div><div className="eyebrow">TOOLS FOR YOUR NEXT STEP</div><h1>Resources</h1><p>A few useful guides for building a study rhythm that lasts.</p></div></div><div className="resource-grid">{resources.map(({title,description,time,icon:Icon,to})=><article className="card resource-card" key={title}><div className="resource-icon"><Icon size={19}/></div><span className="badge blue">STUDY GUIDE</span><h2>{title}</h2><p>{description}</p><div><small>{time}</small><button className="text-link" onClick={()=>go(to)}>Explore <ArrowRight size={15}/></button></div></article>)}</div><section className="card resource-note"><BookOpen size={17}/><div><b>Made for real student life</b><p>These short guides are practical suggestions. Choose the ones that work for you and leave the rest.</p></div></section></>}
