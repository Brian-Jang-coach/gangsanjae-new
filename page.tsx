import { notFound } from 'next/navigation';
import { ContentPage, RoomDetail } from '@/components/site';
import { content } from '@/content/locales';
import { locales, paths, rooms, type Locale } from '@/config/site';
import { JsonLd, breadcrumb, pageMetadata } from '@/lib/metadata';
export const dynamicParams=false;
export function generateStaticParams(){return locales.flatMap(locale=>paths.filter(Boolean).map(path=>({locale,slug:path.split('/')})));}
type Params={locale:Locale;slug:string[]};
export async function generateMetadata({params}:{params:Promise<Params>}){const {locale,slug}=await params;const path=slug.join('/');if(!locales.includes(locale)||!paths.includes(path))notFound();return pageMetadata(locale,path,slug.length===2?rooms.find(r=>r.slug===slug[1])?.name[locale]:undefined);}
export default async function Page({params}:{params:Promise<Params>}){const {locale,slug}=await params;const path=slug.join('/');if(!locales.includes(locale)||!paths.includes(path))notFound();const title=slug.length===2?rooms.find(r=>r.slug===slug[1])!.name[locale]:content[locale].titles[slug[0] as keyof typeof content.ko.titles];return <><JsonLd value={breadcrumb(locale,path,title)}/>{slug[0]==='guide'&&<JsonLd value={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:content[locale].faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}}/>}{slug.length===2?<RoomDetail locale={locale} slug={slug[1]}/>:<ContentPage locale={locale} page={slug[0]}/>}</>;}
