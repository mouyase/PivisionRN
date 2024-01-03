package tech.yojigen.fuckgfw;


import android.net.SSLCertificateSocketFactory;
import android.util.Log;

import androidx.annotation.Nullable;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;

import javax.net.SocketFactory;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;

import kotlin.TypeCastException;
import kotlin.jvm.internal.Intrinsics;

public final class PixivSSLSocketFactory extends SSLSocketFactory {

    private final HostnameVerifier hostnameVerifier = HttpsURLConnection.getDefaultHostnameVerifier();

    private static final PixivSSLSocketFactory mPixivSSLSocketFactory = new PixivSSLSocketFactory();

    public static PixivSSLSocketFactory getInstance() {
        return mPixivSSLSocketFactory;
    }
    @Nullable
    public Socket createSocket(@Nullable String paramString, int paramInt) {
        return null;
    }

    @Nullable
    public Socket createSocket(@Nullable String paramString, int paramInt1, @Nullable InetAddress paramInetAddress, int paramInt2) {
        return null;
    }

    @Nullable
    public Socket createSocket(@Nullable InetAddress paramInetAddress, int paramInt) {
        return null;
    }

    @Nullable
    public Socket createSocket(@Nullable InetAddress paramInetAddress1, int paramInt1, @Nullable InetAddress paramInetAddress2, int paramInt2) {
        return null;
    }

    @NotNull
    public Socket createSocket(@Nullable Socket paramSocket, @Nullable String paramString, int paramInt, boolean paramBoolean) throws IOException {
        if (paramSocket == null) {
            Intrinsics.throwNpe();
        }
        InetAddress inetAddress = paramSocket.getInetAddress();
        Intrinsics.checkExpressionValueIsNotNull(inetAddress, "address");
        SocketFactory socketFactory = SSLCertificateSocketFactory.getDefault(0);
        if (socketFactory != null) {
            Socket socket = socketFactory.createSocket(inetAddress, paramInt);
            if (socket != null) {
                ((SSLSocket) socket).setEnabledProtocols(((SSLSocket) socket).getSupportedProtocols());
                SSLSession sSLSession = ((SSLSocket) socket).getSession();
                return socket;
            }
            throw new TypeCastException("null cannot be cast to non-null type javax.net.ssl.SSLSocket");
        }
        throw new TypeCastException("null cannot be cast to non-null type android.net.SSLCertificateSocketFactory");
    }

    @NotNull
    public String[] getDefaultCipherSuites() {
        return new String[0];
    }

    @NotNull
    public String[] getSupportedCipherSuites() {
        return new String[0];
    }
}