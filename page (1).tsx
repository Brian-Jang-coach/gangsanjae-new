import { Home } from '@/components/site';
import { notFound } from 'next/navigation';
import { site, locales, type Locale } from '@/config/site';
import { JsonLd, pageMetadata } from '@/lib/metadata';
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;if(!locales.includes(locale))notFound();return pageMetadata(locale);}
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;if(!locales.includes(locale))notFound();return <><JsonLd value={{'@context':'https://schema.org','@type':'LodgingBusiness',name:'Kangsanjae',alternateName:'강산재',url:`${site.url}/${locale}`,image:`${site.url}/images/hanok-front.jpg`,address:{'@type':'PostalAddress',streetAddress:'서면 고루개길 110',addressLocality:'홍천군',addressRegion:'강원특별자치도',addressCountry:'KR'}}}/><Home locale={locale}/></>;}
