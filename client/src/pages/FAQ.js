import React, {useState} from 'react'
import {
    LoadMoreButton,
    HeaderMain,
    Navigation,
  } from '../components';
import askicon from '../assets/images/ask.png'

export default function Faq () {

    const [showContent1, setShowContent1 ] = useState(false)
    const [showContent2, setShowContent2 ] = useState(false)
    const [showContent3, setShowContent3 ] = useState(false)
    const [showContent4, setShowContent4 ] = useState(false)
    const [showContent5, setShowContent5 ] = useState(false)
    const [showContent6, setShowContent6 ] = useState(false)
    const [showContent7, setShowContent7 ] = useState(false)

    return (
        <>
            <HeaderMain />
            <Navigation />
            <div className="faq-page">
                <div className="faq-title">
                    <h3>Pertanyaan yang sering ditanyakan:</h3>
                </div>
                
                <button type="button" class="collapsible" onClick={()=>{showContent1? setShowContent1(false) : setShowContent1(true)}}><img src={askicon} className="ask-icon" /> Apa itu Ketuker?</button>
                {showContent1 && (
                    <div class="content">
                    <p>Ketuker adalah aplikasi untuk tukar menukar barang dengan orang lain.</p>
                    </div>
                )}
                
                
                <button type="button" class="collapsible" onClick={()=>{showContent2? setShowContent2(false) : setShowContent2(true)}}><img src={askicon} className="ask-icon" /> Bagaimana cara ikut Ketuker?</button>
                {showContent2 && (
                    <div class="content">
                    <p>Kamu harus bergabung dengan mengisi data diri di form registrasi.</p>
                    <p>Setelah itu kamu bisa upload barang kamu dengan mengisi data barang yang ditukar sehingga orang lain bisa melihat barang yang mau kamu tukar</p>
                    <p>Berdasarkan wishlist kamu, kamu akan melihat barang serupa yang bisa ditukarkan</p>
                    <p>Pilih barang yang kamu ingin tukarkan dan tunggu sampai pemilik barang menyetujuinya</p>
                    </div>
                )}
                
                <button type="button" class="collapsible" onClick={()=>{showContent3? setShowContent3(false) : setShowContent3(true)}}><img src={askicon} className="ask-icon" /> Apakah bisa tukar barang dengan orang lain di Ketuker tanpa registrasi?</button>
                {showContent3 && (
                    <div class="content">
                    <p>Tidak, kamu tidak bisa. Karena kamu tidak akan punya kontak orang yang akan bertukar barang</p>
                    </div>
                )}
                
                <button type="button" class="collapsible" onClick={()=>{showContent4? setShowContent4(false) : setShowContent4(true)}}><img src={askicon} className="ask-icon" /> Bagaimana cara saya menentukan harga barang?</button>
                {showContent4 && (
                    <div class="content">
                    <p>Kamu akan mendapatkan beberapa referensi harga untuk barang sejenis di pasaran saat kamu mengisi form upload barang.</p>
                    </div>
                )}
                
                <button type="button" class="collapsible" onClick={()=>{showContent5? setShowContent5(false) : setShowContent5(true)}}><img src={askicon} className="ask-icon" /> Bagaimana bila ada orang lain tertarik dengan barang kita?</button>
                {showContent5 && (
                    <div class="content">
                    <p>Kamu akan mendapatkan email dan juga bisa melihat status di detail kamu bila ada orang lain tertarik untuk tukeran dengan barang kamu.</p>
                    </div>
                )}
                
                <button type="button" class="collapsible" onClick={()=>{showContent6? setShowContent6(false) : setShowContent6(true)}}><img src={askicon} className="ask-icon" /> Apakah bisa langsung kontak dengan orang yang ingin tukar barang?</button>
                {showContent6 && (
                    <div class="content">
                    <p>Ya, kamu bisa / boleh langsung kontak dengan orang yang tertarik untuk tukar barang.</p>
                    </div>
                )}
                
                <button type="button" class="collapsible" onClick={()=>{showContent7? setShowContent7(false) : setShowContent7(true)}}><img src={askicon} className="ask-icon" /> Apakah ada jaminan kalau saya tidak ditipu ?</button>
                {showContent7 && (
                    <div class="content">
                    <p>Karena di aplikasi ini tidak ada admin, maka kamu harus berhati-hati saat bertukar barang.</p>
                    </div>
                )}
                
            </div>
        </>
    )
}