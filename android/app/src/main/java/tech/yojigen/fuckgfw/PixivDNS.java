package tech.yojigen.fuckgfw;


import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Dns;

public class PixivDNS implements Dns {

    private static PixivDNS mPixivDNS;
    private static List<InetAddress> pixivDns = new ArrayList<>();
    private static final String[] PIXIV_ADDRESSES = {
            "210.140.131.199",
    };
    private static final List<InetAddress> pximgDns = new ArrayList<>();
    private static final String[] PXIMG_ADDRESSES = {
            "210.140.92.143",
            "210.140.92.144",
    };

    private PixivDNS() {
        for (String address : PIXIV_ADDRESSES) {
            try {
                pixivDns.add(InetAddress.getByName(address));
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }
        for (String address : PXIMG_ADDRESSES) {
            try {
                pximgDns.add(InetAddress.getByName(address));
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }
    }

    public static PixivDNS getInstance() {
        if (mPixivDNS == null) {
            mPixivDNS = new PixivDNS();
        }
        return mPixivDNS;
    }


    public List<InetAddress> lookup(String s) throws UnknownHostException {
        if (s.contains("pixiv.net")) {
            try {
                return pixivDns;
            } catch (Exception localException) {
                localException.printStackTrace();
            }
        }
        if (s.contains("pximg.net")) {
            try {
                return pximgDns;
            } catch (Exception localException) {
                localException.printStackTrace();
            }
        }
        return Dns.SYSTEM.lookup(s);
    }
}