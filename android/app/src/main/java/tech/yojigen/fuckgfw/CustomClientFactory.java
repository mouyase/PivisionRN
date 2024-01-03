package tech.yojigen.fuckgfw;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Cache;
import okhttp3.OkHttpClient;
import okhttp3.Protocol;

public class CustomClientFactory implements OkHttpClientFactory {
    @Override
    public OkHttpClient createNewNetworkModuleClient() {

        List<Protocol> protocolList = new ArrayList<>();
        protocolList.add(Protocol.HTTP_1_1);

        return OkHttpClientProvider.createClientBuilder()
                .cookieJar(new ReactCookieJarContainer())
                .protocols(protocolList)
                .sslSocketFactory(PixivSSLSocketFactory.getInstance(), PixivTrustManager.getInstance())
                .dns(PixivDNS.getInstance())
                .build();
    }
}