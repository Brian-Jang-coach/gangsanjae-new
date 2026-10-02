'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronLeft, ChevronRight, Copy as CopyIcon } from 'lucide-react';
import { content } from '@/content/locales';
import { photos, site, type Locale } from '@/config/site';

function useDialog(open: boolean, ref: React.RefObject<HTMLDialogElement | null>) {
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const active = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = previous; active?.focus(); };
  }, [open, ref]);
}
export function Header({ locale }: { locale: Locale }) {
  const c = content[locale]; const path = usePathname();
  const [open, setOpen] = useState(false); const ref = useRef<HTMLDialogElement>(null);
  useDialog(open, ref);
  const nav = ['about','stay','experiences','filming','explore','guide'];
  const lang = (l: Locale) => '/' + l + path.replace(/^\/(ko|en)/, '');
  return <><header className="header"><div className="container header-inner"><Link className="logo" href={`/${locale}`} aria-label={locale==='ko'?'강산재 홈':'Kangsanjae home'}><strong>{locale==='ko'?'강 산 재':'KANGSANJAE'}</strong><span>{locale==='ko'?'KANGSANJAE':'PRIVATE HANOK RETREAT'}</span></Link><nav className="desktop-nav" aria-label={c.navigation}>{nav.map((p,i)=><Link key={p} href={`/${locale}/${p}`} aria-current={path===`/${locale}/${p}`?'page':undefined}>{c.nav[i]}</Link>)}</nav><div className="header-actions"><div className="languages"><Link href={lang('ko')} lang="ko" aria-label="한국어" aria-current={locale==='ko'?'page':undefined}>KR</Link><span>|</span><Link href={lang('en')} lang="en" aria-label="English" aria-current={locale==='en'?'page':undefined}>EN</Link></div><Link className="button small header-book" href={`/${locale}/contact`}>{c.book}</Link><button className="icon-button mobile-toggle" aria-label={c.menu} aria-expanded={open} onClick={()=>setOpen(true)}><Menu/></button></div></div></header>{open&&<dialog ref={ref} className="menu-dialog" onCancel={()=>setOpen(false)} aria-label={c.menu}><div className="menu-top"><span>KANGSANJAE</span><button className="icon-button" onClick={()=>setOpen(false)} aria-label={c.close}><X/></button></div><nav>{nav.map((p,i)=><Link key={p} href={`/${locale}/${p}`} onClick={()=>setOpen(false)}>{c.nav[i]}</Link>)}<Link href={`/${locale}/gallery`} onClick={()=>setOpen(false)}>{c.titles.gallery}</Link><Link className="button" href={`/${locale}/contact`} onClick={()=>setOpen(false)}>{c.book}</Link></nav><div className="languages"><Link href={lang('ko')} onClick={()=>setOpen(false)}>KR</Link><span>|</span><Link href={lang('en')} onClick={()=>setOpen(false)}>EN</Link></div></dialog>}</>;
}
export function Gallery({ locale }: { locale: Locale }) {
  const c = content[locale]; const [filter,setFilter]=useState('all'); const [selected,setSelected]=useState<number|null>(null); const ref=useRef<HTMLDialogElement>(null);
  useDialog(selected!==null,ref);
  const categories=['all','hanok','rooms','nature','seasons','experience','filming'];
  const visible=photos.map((p,i)=>({p,i})).filter(({p})=>filter==='all'||p.category===filter);
  const move=(step:number)=>setSelected(s=>s===null?null:(s+step+photos.length)%photos.length);
  return <><div className="filters" role="group" aria-label={c.titles.gallery}>{categories.map((f,i)=><button key={f} className={filter===f?'active':''} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{c.galleryFilters[i]}</button>)}</div><div className="gallery-grid">{visible.map(({p,i})=><button key={p.src} className="gallery-item" onClick={()=>setSelected(i)} aria-label={p[locale]}><Image src={p.src} alt={p[locale]} width={p.width} height={p.height} sizes="(max-width: 760px) 48vw, 42vw"/><span>{p[locale]}</span></button>)}</div>{visible.length===0&&<p className="empty">{c.emptyGallery}</p>}{selected!==null&&<dialog ref={ref} className="lightbox" aria-label={photos[selected][locale]} onCancel={()=>setSelected(null)} onKeyDown={e=>{if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1);}}><button autoFocus className="icon-button lightbox-close" aria-label={c.close} onClick={()=>setSelected(null)}><X/></button><div className="lightbox-body"><button className="icon-button" aria-label={c.prev} onClick={()=>move(-1)}><ChevronLeft/></button><Image src={photos[selected].src} alt={photos[selected][locale]} width={1280} height={853} sizes="90vw"/><button className="icon-button" aria-label={c.next} onClick={()=>move(1)}><ChevronRight/></button></div><p>{photos[selected][locale]} · {selected+1} / {photos.length}</p></dialog>}</>;
}
export function Address({ locale }: { locale: Locale }) {
  const c=content[locale];const [status,setStatus]=useState('');
  return <div className="address"><p>{site.address}</p>{locale==='en'&&<p>{site.addressEn}</p>}<div className="buttons"><a className="button" href={site.mapUrl} target="_blank" rel="noopener noreferrer">{c.directions}</a><button className="button outline" onClick={async()=>{try{await navigator.clipboard.writeText(site.address);setStatus(c.copied);}catch{setStatus(c.copyFail);}}}><CopyIcon size={16}/>{c.copy}</button></div><p role="status">{status}</p></div>;
}
export function InquiryForm({locale,filming=false}:{locale:Locale;filming?:boolean}) {
  const c=content[locale]; const [errors,setErrors]=useState<Record<string,string>>({}); const [status,setStatus]=useState(''); const statusRef=useRef<HTMLParagraphElement>(null);
  const fields: Array<keyof typeof c.formLabels> = filming?['name','company','email','phone','type','date','people','vehicles','equipment','message']:['name','email','phone','date','message'];
  const required=['name','email','message',...(filming?['phone','type','date','people']:[])];
  function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault(); const form=e.currentTarget; const data=new FormData(form);const next:Record<string,string>={};required.forEach(f=>{if(!String(data.get(f)||'').trim())next[f]=c.requiredError;});if(data.get('email')&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email'))))next.email=c.emailError;for(const field of ['people','vehicles']){const value=data.get(field);if(value&&(!Number.isInteger(Number(value))||Number(value)<(field==='people'?1:0)))next[field]=c.positiveError;}if(!data.get('agree'))next.agree=c.requiredError;setErrors(next);setStatus(Object.keys(next).length?c.requiredError:c.demoSuccess);setTimeout(()=>{if(Object.keys(next).length){(form.querySelector('[aria-invalid="true"]') as HTMLElement|null)?.focus();}if(!Object.keys(next).length)statusRef.current?.focus();},0);}
  return <section className="form-section" id="inquiry"><p className="eyebrow">CONTACT</p><h2>{filming?c.filmFormTitle:c.formTitle}</h2><p className="notice">{c.demo}</p><form noValidate onSubmit={submit}><div className="form-grid">{fields.map(f=><div key={f} className={f==='message'?'full':''}><label htmlFor={f}>{c.formLabels[f]} <span>({required.includes(f)?c.required:c.optional})</span></label>{f==='message'?<textarea id={f} name={f} rows={5} required aria-invalid={!!errors[f]} aria-describedby={errors[f]?`${f}-error`:undefined}/>:f==='type'?<select id={f} name={f} required aria-invalid={!!errors[f]} aria-describedby={errors[f]?`${f}-error`:undefined}><option value="">{c.formLabels.type}</option>{c.filmTypes.map(t=><option key={t}>{t}</option>)}</select>:<input id={f} name={f} type={f==='email'?'email':f==='date'?'date':f==='people'||f==='vehicles'?'number':f==='phone'?'tel':'text'} min={f==='vehicles'?0:1} autoComplete={f==='name'?'name':f==='email'?'email':f==='phone'?'tel':f==='company'?'organization':undefined} required={required.includes(f)} aria-invalid={!!errors[f]} aria-describedby={errors[f]?`${f}-error`:undefined}/>} {errors[f]&&<p id={`${f}-error`} className="error">{errors[f]}</p>}</div>)}</div><label className="consent"><input type="checkbox" name="agree" required aria-invalid={!!errors.agree} aria-describedby={errors.agree?'agree-error':undefined}/><span>{c.agree} <Link href={`/${locale}/privacy`}>{c.titles.privacy}</Link></span></label>{errors.agree&&<p className="error" id="agree-error">{errors.agree}</p>}<button className="button" type="submit">{c.submit}</button><p ref={statusRef} tabIndex={-1} role="status" className="form-status">{status}</p></form></section>;
}
