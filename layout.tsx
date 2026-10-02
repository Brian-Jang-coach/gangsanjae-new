import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/interactive';
import { Footer } from '@/components/site';
import { content } from '@/content/locales';
import { site, locales, type Locale } from '@/config/site';
export const dynamicParams = false;
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params; if(!locales.includes(locale as Locale))notFound();const c=content[locale as Locale];return {metadataBase:new URL(site.url),title:{default:locale==='ko'?'강산재 | 홍천 프라이빗 한옥':'Kangsanjae | Private Hanok Retreat',template:'%s | KANGSANJAE'},description:c.description,icons:{icon:'/favicon.svg'}};}
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!locales.includes(locale as Locale))notFound();const l=locale as Locale;return <html lang={l} data-scroll-behavior="smooth"><body><a href="#main" className="skip-link">{content[l].skip}</a><Header locale={l}/><main id="main">{children}</main><Footer locale={l}/></body></html>;}
