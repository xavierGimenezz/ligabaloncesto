package com.xavipandis.liga.web.rest;

import com.xavipandis.liga.Application;
import com.xavipandis.liga.domain.Partido;
import com.xavipandis.liga.repository.PartidoRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the PartidoResource REST controller.
 *
 * @see PartidoResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class PartidoResourceIntTest {


    private static final Integer DEFAULT_JORNADA = 1;
    private static final Integer UPDATED_JORNADA = 2;

    @Inject
    private PartidoRepository partidoRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restPartidoMockMvc;

    private Partido partido;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PartidoResource partidoResource = new PartidoResource();
        ReflectionTestUtils.setField(partidoResource, "partidoRepository", partidoRepository);
        this.restPartidoMockMvc = MockMvcBuilders.standaloneSetup(partidoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        partido = new Partido();
        partido.setJornada(DEFAULT_JORNADA);
    }

    @Test
    @Transactional
    public void createPartido() throws Exception {
        int databaseSizeBeforeCreate = partidoRepository.findAll().size();

        // Create the Partido

        restPartidoMockMvc.perform(post("/api/partidos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(partido)))
                .andExpect(status().isCreated());

        // Validate the Partido in the database
        List<Partido> partidos = partidoRepository.findAll();
        assertThat(partidos).hasSize(databaseSizeBeforeCreate + 1);
        Partido testPartido = partidos.get(partidos.size() - 1);
        assertThat(testPartido.getJornada()).isEqualTo(DEFAULT_JORNADA);
    }

    @Test
    @Transactional
    public void checkJornadaIsRequired() throws Exception {
        int databaseSizeBeforeTest = partidoRepository.findAll().size();
        // set the field null
        partido.setJornada(null);

        // Create the Partido, which fails.

        restPartidoMockMvc.perform(post("/api/partidos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(partido)))
                .andExpect(status().isBadRequest());

        List<Partido> partidos = partidoRepository.findAll();
        assertThat(partidos).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPartidos() throws Exception {
        // Initialize the database
        partidoRepository.saveAndFlush(partido);

        // Get all the partidos
        restPartidoMockMvc.perform(get("/api/partidos"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(partido.getId().intValue())))
                .andExpect(jsonPath("$.[*].jornada").value(hasItem(DEFAULT_JORNADA)));
    }

    @Test
    @Transactional
    public void getPartido() throws Exception {
        // Initialize the database
        partidoRepository.saveAndFlush(partido);

        // Get the partido
        restPartidoMockMvc.perform(get("/api/partidos/{id}", partido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(partido.getId().intValue()))
            .andExpect(jsonPath("$.jornada").value(DEFAULT_JORNADA));
    }

    @Test
    @Transactional
    public void getNonExistingPartido() throws Exception {
        // Get the partido
        restPartidoMockMvc.perform(get("/api/partidos/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartido() throws Exception {
        // Initialize the database
        partidoRepository.saveAndFlush(partido);

		int databaseSizeBeforeUpdate = partidoRepository.findAll().size();

        // Update the partido
        partido.setJornada(UPDATED_JORNADA);

        restPartidoMockMvc.perform(put("/api/partidos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(partido)))
                .andExpect(status().isOk());

        // Validate the Partido in the database
        List<Partido> partidos = partidoRepository.findAll();
        assertThat(partidos).hasSize(databaseSizeBeforeUpdate);
        Partido testPartido = partidos.get(partidos.size() - 1);
        assertThat(testPartido.getJornada()).isEqualTo(UPDATED_JORNADA);
    }

    @Test
    @Transactional
    public void deletePartido() throws Exception {
        // Initialize the database
        partidoRepository.saveAndFlush(partido);

		int databaseSizeBeforeDelete = partidoRepository.findAll().size();

        // Get the partido
        restPartidoMockMvc.perform(delete("/api/partidos/{id}", partido.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Partido> partidos = partidoRepository.findAll();
        assertThat(partidos).hasSize(databaseSizeBeforeDelete - 1);
    }
}
