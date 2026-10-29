import React from 'react';
import { AlertCircle, Info, LoaderCircle } from 'lucide-react';

export function Input({label,error,id,...props}){const inputId=id||props.name;return <label className="field" htmlFor={inputId}>{label}<input id={inputId} aria-invalid={!!error} aria-describedby={error?`${inputId}-error`:undefined} {...props}/>{error&&<small id={`${inputId}-error`} role="alert" className="field-error">{error}</small>}</label>}
export function Select({label,id,children,...props}){const selectId=id||props.name;return <label className="field" htmlFor={selectId}>{label}<select id={selectId} {...props}>{children}</select></label>}
export function Checkbox({label,...props}){return <label className="checkbox-control"><input type="checkbox" {...props}/><span>{label}</span></label>}
export function Toggle({label,description,checked,onChange}){return <div className="toggle-row"><div><b>{label}</b>{description&&<p>{description}</p>}</div><button type="button" role="switch" aria-label={label} aria-checked={checked} onClick={()=>onChange(!checked)} className={`switch ${checked?'on':''}`}><i/></button></div>}
export function Tooltip({label,children}){return <span className="tooltip" tabIndex="0" aria-label={label}>{children}<span role="tooltip">{label}</span></span>}
export function LoadingState({label='Loading your workspace'}){return <div className="loading-state" role="status"><LoaderCircle className="loading-spinner" size={20}/><span>{label}</span></div>}
export function ErrorState({title='Something went wrong',description='Please try again in a moment.',onRetry}){return <div className="error-state" role="alert"><AlertCircle size={21}/><b>{title}</b><p>{description}</p>{onRetry&&<button className="button" onClick={onRetry}>Try again</button>}</div>}
export function InfoHint({children}){return <span className="info-hint"><Info size={14}/>{children}</span>}
