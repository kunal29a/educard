import { formatLocalDateTime } from '../utils/taskUtils.js';

export const student = { name:'Alex Morgan', college:'Northwestern University', major:'Computer Science', semester:'Semester 4', goals:['Stay consistent','Improve in DSA','Protect weekends'], preferences:{ focusMinutes:25, studyWindow:'Morning' }, avatar:'AM' };
export const subjects = [
 {id:'dsa',name:'Data Structures',short:'DSA',color:'#6177ed',score:78,hours:8.4},
 {id:'stats',name:'Statistics',short:'Statistics',color:'#42a98b',score:91,hours:6.2},
 {id:'econ',name:'Economics',short:'Economics',color:'#ec9d55',score:84,hours:4.8},
 {id:'design',name:'Product Design',short:'Design',color:'#a178dd',score:88,hours:3.6}
];
export const initialTasks = [
 {id:'t1',title:'Binary trees — practice set',subject:'Data Structures',deadline:todayAt(17),duration:45,priority:'High',difficulty:'Hard',status:'today',notes:'Focus on traversal patterns'},
 {id:'t2',title:'Review hypothesis testing',subject:'Statistics',deadline:todayAt(19),duration:30,priority:'Medium',difficulty:'Medium',status:'today',notes:''},
 {id:'t3',title:'Read chapter 6: market structures',subject:'Economics',deadline:dayOffset(2,16),duration:40,priority:'Low',difficulty:'Easy',status:'upcoming',notes:''},
 {id:'t4',title:'Figma prototype critique',subject:'Product Design',deadline:dayOffset(3,15),duration:60,priority:'Medium',difficulty:'Medium',status:'upcoming',notes:''},
 {id:'t5',title:'Dynamic programming quiz',subject:'Data Structures',deadline:dayOffset(-1,18),duration:35,priority:'High',difficulty:'Hard',status:'missed',notes:''},
 {id:'t6',title:'Probability problem set',subject:'Statistics',deadline:dayOffset(-1,12),duration:50,priority:'Medium',difficulty:'Medium',status:'completed',notes:''},
 {id:'t7',title:'Weekly reflection',subject:'Product Design',deadline:dayOffset(-2,15),duration:20,priority:'Low',difficulty:'Easy',status:'completed',notes:''}
];
function todayAt(hour){const d=new Date();d.setHours(hour,0,0,0);return formatLocalDateTime(d)}
function dayOffset(days,hour){const d=new Date();d.setDate(d.getDate()+days);d.setHours(hour,0,0,0);return formatLocalDateTime(d)}
export const week = [ {day:'Mon',hours:2.4,tasks:5},{day:'Tue',hours:3.1,tasks:6},{day:'Wed',hours:1.8,tasks:4},{day:'Thu',hours:3.8,tasks:7},{day:'Fri',hours:2.7,tasks:5},{day:'Sat',hours:4.2,tasks:8},{day:'Sun',hours:2.1,tasks:4} ];
export const alerts = [
 {id:'a1',title:'A deadline slipped by',text:'Dynamic programming quiz was due yesterday. A short review today can get you back on track.',severity:'high',time:'Yesterday',icon:'Clock'},
 {id:'a2',title:'DSA has been waiting a while',text:'You have postponed a Data Structures task twice this week. Try a 25-minute starting block.',severity:'medium',time:'2 hours ago',icon:'Repeat2'},
 {id:'a3',title:'A strong week in Statistics',text:'Your recent practice scores are up 8% from last week. Keep that rhythm going.',severity:'low',time:'Today',icon:'TrendingUp'},
 {id:'a4',title:'Economics reading is coming up',text:'Chapter 6 is due in two days. There is room in your Thursday plan.',severity:'medium',time:'Today',icon:'BookOpen'}
];
export const insights = { performance:82, completion:74, risk:34, behavior:'Your task completion rate tends to dip on weekdays after 8 PM.', recommendation:'Break DSA into three smaller 25-minute sessions this week.', focus:'Statistics', confidence:'Based on your recent study patterns' };
