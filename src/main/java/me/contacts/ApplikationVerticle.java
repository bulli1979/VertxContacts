package me.contacts;
import java.sql.SQLException;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;
import me.contacts.data.DAOContact;

public class ApplikationVerticle extends AbstractVerticle {
	HttpServer http;
	@Override
	public void start(Future<Void> future) throws Exception {
		Router router = Router.router(vertx);
		router.route().handler(BodyHandler.create());
		
		router.get("/getContacts/").handler(rc -> {
			vertx.executeBlocking( block -> {
				try {
					block.complete(DAOContact.getInstance().getContacts());
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}, res -> {
				rc.response().putHeader("content-type", "application/json").end( res.result().toString());			
			});
		});
		
		router.post("/editContact/").handler(rc -> {
			vertx.executeBlocking( block -> {
				JsonObject contact = rc.getBodyAsJson();
				block.complete(DAOContact.getInstance().insertUpdateContact(contact));
			}, res -> {
				rc.response().putHeader("content-type", "application/json").end(res.result().toString());
			});
		});
		
		router.route().handler(StaticHandler.create());
		http = vertx.createHttpServer()
				.requestHandler(router::accept)
				.listen(config().getInteger("http.port", 8081),
				result -> {
					if (result.succeeded()) {
						future.complete();
					} else {
						future.fail(result.cause());
					}
				});
	}

	@Override
	public void stop(Future<Void> stopFuture) throws Exception {
		http.close(closed -> {
			if (closed.succeeded()) {
				stopFuture.complete();
			} else {
				stopFuture.fail(closed.cause());
			}
		});
	}
}
